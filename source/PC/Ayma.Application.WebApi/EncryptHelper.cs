using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Ayma.Application.WebApi;
using Senparc.Weixin.WxOpen;
using Senparc.Weixin.WxOpen.Entities;

namespace Ayma.Application.WebApi
{
    public static class EncryptHelper
    {


        /// <summary>
        /// 扩展解密消息（通过SessionId获取）
        /// </summary>
        /// <param name="sessionId"></param>
        /// <param name="encryptedData"></param>
        /// <param name="iv"></param>
        /// <exception cref="WxOpenException">当SessionId或SessionKey无效时抛出异常</exception>
        /// <returns></returns>
        public static string DecodeEncryptedDataBySessionId(string sessionId, string encryptedData, string iv)
        {
            var sessionBag = SessionContainer.GetSession(sessionId);
            if (sessionBag == null)
            {
                throw new WxOpenException("SessionId无效");
            }

            if (string.IsNullOrEmpty(sessionBag.SessionKey))
            {
                throw new WxOpenException("SessionKey无效");
            }

            var resultStr = Senparc.Weixin.WxOpen.Helpers.EncryptHelper.DecodeEncryptedData(sessionBag.SessionKey, encryptedData, iv);
            return resultStr;
        }

        /// <summary>
        /// 扩展 解密UserInfo消息（通过SessionId获取）
        /// </summary>
        /// <param name="sessionId"></param>
        /// <param name="encryptedData"></param>
        /// <param name="iv"></param>
        /// <exception cref="WxOpenException">当SessionId或SessionKey无效时抛出异常</exception>
        /// <returns></returns>
        public static DecodedUserInfo DecodeUserInfoBySessionId(string sessionId, string encryptedData, string iv)
        {
            var jsonStr = DecodeEncryptedDataBySessionId(sessionId, encryptedData, iv);
#if NET45
            JavaScriptSerializer js = new JavaScriptSerializer();
            var userInfo = js.Deserialize<DecodedUserInfo>(jsonStr);
#else
            var userInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<DecodedUserInfo>(jsonStr);
#endif
            return userInfo;
        }

        /// <summary>
        /// 扩展解密手机号
        /// </summary>
        /// <param name="encryptedData"></param>
        /// <param name="iv"></param>
        /// <returns></returns>
        public static DecodedPhoneNumber DecryptPhoneNumber(string sessionId, string encryptedData, string iv)
        {
            var jsonStr = DecodeEncryptedDataBySessionId(sessionId, encryptedData, iv);

#if NET45
            JavaScriptSerializer js = new JavaScriptSerializer();
            var phoneNumber = js.Deserialize<DecodedPhoneNumber>(jsonStr);
#else
            var phoneNumber = Newtonsoft.Json.JsonConvert.DeserializeObject<DecodedPhoneNumber>(jsonStr);
#endif
            return phoneNumber;
        }

        private static byte[] AES_Decrypt(String Input, byte[] Iv, byte[] Key)
        {
#if NET45
            RijndaelManaged aes = new RijndaelManaged();
#else
            SymmetricAlgorithm aes = Aes.Create();
#endif
            aes.KeySize = 128; //原始：256
            aes.BlockSize = 128;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            aes.Key = Key;
            aes.IV = Iv;
            var decrypt = aes.CreateDecryptor(aes.Key, aes.IV);
            byte[] xBuff = null;
            using (var ms = new MemoryStream())
            {
                using (var cs = new CryptoStream(ms, decrypt, CryptoStreamMode.Write))
                {
                    //        cs.Read(decryptBytes, 0, decryptBytes.Length);
                    //        cs.Close();
                    //        ms.Close();

                    byte[] xXml = Convert.FromBase64String(Input);
                    byte[] msg = new byte[xXml.Length + 32 - xXml.Length%32];
                    Array.Copy(xXml, msg, xXml.Length);
                    cs.Write(xXml, 0, xXml.Length);
                }
                xBuff = decode2(ms.ToArray());
            }
            return xBuff;
        }

        private static byte[] decode2(byte[] decrypted)
        {
            int pad = (int) decrypted[decrypted.Length - 1];
            if (pad < 1 || pad > 32)
            {
                pad = 0;
            }
            byte[] res = new byte[decrypted.Length - pad];
            Array.Copy(decrypted, 0, res, 0, decrypted.Length - pad);
            return res;
        }

        /// <summary>
        /// 解密所有消息的基础方法
        /// </summary>
        /// <param name="sessionKey">储存在 SessionBag 中的当前用户 会话 SessionKey</param>
        /// <param name="encryptedData">接口返回数据中的 encryptedData 参数</param>
        /// <param name="iv">接口返回数据中的 iv 参数，对称解密算法初始向量</param>
        /// <returns></returns>
        public static string DecodeEncryptedData(string sessionKey, string encryptedData, string iv)
        {
            var aesCipher = Convert.FromBase64String(encryptedData);
            var aesKey = Convert.FromBase64String(sessionKey);
            var aesIV = Convert.FromBase64String(iv);

            var result = AES_Decrypt(encryptedData, aesIV, aesKey);
            var resultStr = Encoding.UTF8.GetString(result);
            return resultStr;
        }

        /// <summary>
        /// Aes解密
        /// </summary>
        /// <param name="str">需要解密的字符串</param>
        /// <param name="key">密钥,长度不够时空格补齐,超过时从左截取</param>
        /// <param name="iv">偏移量,长度不够时空格补齐,超过时从左截取</param>
        /// <param name="keyLenth">秘钥长度,16 24 32</param>
        /// <param name="aesMode">解密模式</param>
        /// <param name="aesPadding">填充方式</param>
        /// <returns></returns>
        public static string AesDecode(string str, string key, string iv, int keyLenth = 16,
            CipherMode aesMode = CipherMode.CBC, PaddingMode aesPadding = PaddingMode.PKCS7)
        {
            if (!new List<int> {16, 24, 32}.Contains(keyLenth))
            {
                return null; //密钥的长度，16位密钥 = 128位，24位密钥 = 192位，32位密钥 = 256位。
            }
            var oldBytes = Convert.FromBase64String(str);
            var bKey = new Byte[keyLenth];
            Array.Copy(Convert.FromBase64String(key.PadRight(keyLenth)), bKey, keyLenth);
            var bIv = new Byte[16];
            Array.Copy(Convert.FromBase64String(iv.PadRight(16)), bIv, 16);

            var rijalg = new RijndaelManaged
            {
                Mode = aesMode,
                Padding = aesPadding,
                Key = bKey,
                IV = bIv,
            };
            var decryptor = rijalg.CreateDecryptor(rijalg.Key, rijalg.IV);
            var rtByte = decryptor.TransformFinalBlock(oldBytes, 0, oldBytes.Length);
            return Encoding.UTF8.GetString(rtByte);
        }
    }
}
