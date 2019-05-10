using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer
{
    public interface SmallProgramServerApiIBLL
    {
        /// <summary>
        /// 修改订单状态
        /// </summary>
        /// <param name="F_AirfieldId">机场ID</param>
        /// <param name="F_OrderNo">订单号</param>
        /// <param name="F_State_Old">原状态值</param>
        /// <param name="F_State_New">新状态值</param>
        /// <param name="Operator">操作人</param>
        /// <param name="errCode">成功状态  100  成功</param>
        /// <param name="errText">提示信息</param>
        void SubmitUpdateOrderState(string F_AirfieldId, string F_OrderNo, string F_State_Old, string F_State_New, string Operator, out int errCode, out string errText);
    }
}
