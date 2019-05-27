using Ayma.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ayma.Application.TwoDevelopment.TwoDev
{
    /// <summary>
    /// 创 建：超级管理员
    /// 日 期：2019-05-13 14:01
    /// 描 述：航班号记录
    /// </summary>
    public partial class T_FlightNoInfoEntity 
    {
        #region 实体成员
        /// <summary>
        /// 标示
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 机场Id
        /// </summary>
        [Column("F_AIRFIELDID")]
        public string F_AirfieldId { get; set; }
        /// <summary>
        /// 机场名称
        /// </summary>
        [Column("F_AIRFIELDNAME")]
        public string F_AirfieldName { get; set; }
        /// <summary>
        /// 传送带号
        /// </summary>
        [Column("F_CONVEYORNUMBER")]
        public string F_ConveyorNumber { get; set; }
        /// <summary>
        /// 机位口
        /// </summary>
        [Column("F_PLACEMENT")]
        public string F_Placement { get; set; }
        /// <summary>
        /// 航站楼
        /// </summary>
        [Column("F_AIRFIELDFLOOR")]
        public string F_AirfieldFloor { get; set; }

        /// <summary>
        /// 航空公司Id
        /// </summary>
        [Column("F_FLIGHTCOMPANYID")]
        public string F_FlightCompanyId { get; set; }
        /// <summary>
        /// 航空公司
        /// </summary>
        [Column("F_FLIGHTCOMPANY")]
        public string F_FlightCompany { get; set; }
        /// <summary>
        /// 航班号
        /// </summary>
        [Column("F_FLIGHTNUMBER")]
        public string F_FlightNumber { get; set; }
        /// <summary>
        /// 起飞地址
        /// </summary>
        [Column("ADDRESSBEGIN")]
        public string AddressBegin { get; set; }
        /// <summary>
        /// 到达地址
        /// </summary>
        [Column("ADDRESSEND")]
        public string AddressEnd { get; set; }
        /// <summary>
        /// 起飞时间
        /// </summary>
        [Column("DATETIMEBEGIN")]
        public string DateTimeBegin { get; set; }
        /// <summary>
        /// 到达时间
        /// </summary>
        [Column("DATETIMEEND")]
        public string DateTimeEnd { get; set; }
        /// <summary>
        /// 实际到达时间
        /// </summary>
        [Column("DATETIMEENDREALITY")]
        public string DateTimeEndReality { get; set; }
        #endregion

        #region 扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_Id = keyValue;
        }
        #endregion
        #region 扩展字段
        #endregion
    }
}

