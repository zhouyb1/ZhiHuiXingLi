using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ayma.Application.WebApi.Modules.ErpApi
{
    public class SmallProgramServerApi : PdaBaseApi
    {
        public SmallProgramServerApi()
            : base("/pdaapi")
        {
            Post["/SubmitBillSaleOut"] = SubmitBillSaleOut; //提交车班补货单
        }

        /// <summary>
        /// 提交车班补货单
        /// </summary>
        /// <returns></returns>
        public Response SubmitBillSaleOut(dynamic _)
        {
            int errCode = 0;
            string errText = "";
            if (errCode == 100)
            {
                return Success(errText);
            }
            else
            {
                return Fail(errText);
            }
        }
    }
}