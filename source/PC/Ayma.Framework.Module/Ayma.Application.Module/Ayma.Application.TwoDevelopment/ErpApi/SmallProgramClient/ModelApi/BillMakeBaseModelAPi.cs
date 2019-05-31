using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi
{
    public class BillMakeBaseModelAPi
    {
        public BillMakeTempModelApi Head { get; set; }
        public List<BillMakeTempBModelApi> OrderDetails { get; set; }
    }
    public class BillMakeTempModelApi
    {
        /// <summary>
        /// 新增始发站
        /// </summary>
        public string F_StartStation { get; set; }

        /// <summary>
        /// 机场Id
        /// </summary>
        public string F_AirfieldId { get; set; }

        /// <summary>
        /// 机场名称（终点站）
        /// </summary>
        public string F_AirfieldName { get; set; }

        /// <summary>
        /// 航站楼
        /// </summary>
        public string F_AirfieldFloor { get; set; }

        /// <summary>
        /// 航空公司
        /// </summary>
        public string F_FlightCompany { get; set; }

        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 订单日期
        /// </summary>
        public DateTime F_OrderDate { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }

        /// <summary>
        /// 客户姓名
        /// </summary>
        public string F_CustomerName { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        public string F_CustomerPhone { get; set; }

        /// <summary>
        /// 客户地址
        /// </summary>
        public string F_CustomerAddress { get; set; }

        /// <summary>
        /// 客户备注
        /// </summary>
        public string F_CustomerRemarks { get; set; }

        /// <summary>
        /// 订单创建类型
        /// </summary>
        public string F_CreateStype { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string F_State { get; set; }

        /// <summary>
        /// 订单类型
        /// </summary>
        public string F_Stype { get; set; }

        /// <summary>
        /// 订单创建日期
        /// </summary>
        public DateTime F_CreateTime { get; set; }

        /// <summary>
        /// 订单创建人
        /// </summary>
        public string F_CreateUserName { get; set; }

        /// <summary>
        /// 微信OpenId
        /// </summary>
        public string F_OpenId { get; set; }
        /// <summary>
        /// 普通、加急
        /// </summary>
        public string F_IsUrgent { get; set; }
        /// <summary>
        /// 新增经度 2019年5月17日18:40:45
        /// </summary>
        public string F_Longitude { get; set; }

        /// <summary>
        /// 新增纬度2019年5月17日18:41:19
        /// </summary>
        public string F_Latitude { get; set; }

        public string F_FareName { get; set; }

        public string F_FarePhone { get; set; }
    }

    public class BillMakeTempBModelApi
    {
        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }

        /// <summary>
        /// 托运单号
        /// </summary>
        public string F_ConsignmentNumber { get; set; }

        /// <summary>
        /// 重量
        /// </summary>
        public decimal? F_Weight { get; set; }

        /// <summary>
        /// 配送距离
        /// </summary>
        public decimal? F_Distance { get; set; }

        /// <summary>
        /// 价格
        /// </summary>
        public decimal? F_Price { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        public int F_Qty { get; set; }
    }
}
