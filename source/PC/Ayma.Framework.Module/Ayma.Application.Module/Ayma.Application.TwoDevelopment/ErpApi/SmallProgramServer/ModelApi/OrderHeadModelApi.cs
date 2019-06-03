using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramServer.ModelApi
{
    public class OrderHeadModelApi
    {
        /// <summary>
        /// Id
        /// </summary>
        public string F_Id { get; set; }

        /// <summary>
        /// 机场Id
        /// </summary>
        public string F_AirfieldId { get; set; }

        /// <summary>
        /// 机场名称
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
    }


    public class GetFlightListByFNo
    {
        /// <summary>
        /// 航空公司
        /// </summary>
        public string F_FlightCompany { get; set; }

        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }

        /// <summary>
        /// 机位口
        /// </summary>
        public string F_Placement { get; set; }

        /// <summary>
        /// 分拣口
        /// </summary>
        public string F_ConveyorNumber { get; set; }

        /// <summary>
        /// 始发站
        /// </summary>
        public string AddressBegin { get; set; }

        /// <summary>
        /// 终点站
        /// </summary>
        public string AddressEnd { get; set; }

        /// <summary>
        /// 起飞时间
        /// </summary>
        public DateTime DateTimeEndReality { get; set; }

        /// <summary>
        /// 到达时间
        /// </summary>
        public DateTime DateTimeEnd { get; set; }

        /// <summary>
        /// 行李总件数
        /// </summary>
        public int TotalQty { get; set; }

        /// <summary>
        /// 订单总数
        /// </summary>
        public int TotalOrder { get; set; }
    }

    public class GetFlightListByDate
    {
        /// <summary>
        /// 航班号
        /// </summary>
        public string F_FlightNumber { get; set; }
        /// <summary>
        /// 航站楼
        /// </summary>
        public string F_AirfieldFloor { get; set; }
        /// <summary>
        /// 订单号
        /// </summary>
        public string F_OrderNo { get; set; }

        /// <summary>
        /// 到达时间
        /// </summary>
        public DateTime DateTimeEnd { get; set; }

        /// <summary>
        /// 分拣口
        /// </summary>
        public string F_ConveyorNumber { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string F_State { get; set; }

        /// <summary>
        /// 行李号
        /// </summary>
        public List<ConsignmentNumber> CNumberList { get; set; }

    }

    public class EmployeeInfoModelApi
    {
        /// <summary>
        /// Id
        /// </summary>
        public string F_Id { get; set; }
        /// <summary>
        /// 微信OpenId
        /// </summary>
        public string F_Openid { get; set; }
        /// <summary>
        /// 微信名称
        /// </summary>
        public string F_Nickname { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public string F_Sex { get; set; }
        /// <summary>
        /// 语言
        /// </summary>
        public string F_Language { get; set; }
        /// <summary>
        /// 城市
        /// </summary>
        public string F_City { get; set; }
        /// <summary>
        /// 省份
        /// </summary>
        public string F_Province { get; set; }
        /// <summary>
        /// 国家
        /// </summary>
        public string F_Country { get; set; }
        /// <summary>
        /// 图像地址
        /// </summary>
        public string F_Headimgurl { get; set; }
        /// <summary>
        /// 联系电话
        /// </summary>
        public string F_Phone { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime F_CreateTime { get; set; }
        /// <summary>
        /// 身份证号码
        /// </summary>
        public string F_IdCard { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string F_Name { get; set; }
        /// <summary>
        /// 工号
        /// </summary>
        public string F_Code { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string F_PassWord { get; set; }
        /// <summary>
        /// 等级
        /// </summary>
        public string F_Grade { get; set; }
        /// <summary>
        /// 分数
        /// </summary>
        public int F_Fraction { get; set; }
    }

    public class OrderLogisticsInfo
    {
        public string F_OrderNo { get; set; }

        public List<LogisticsInfo> LogisticsInfo { get; set; }
    }

    public class LogisticsInfo
    {
        public string F_StateDescribe { get; set; }

        public string F_LogState { get; set; }

        public DateTime F_StateDateTime { get; set; }

        public string F_StateOperator { get; set; }
    }
}
