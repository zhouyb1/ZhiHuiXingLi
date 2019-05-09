///下面两个编译条件参数指定产生报表数据的格式。如果都不定义，则产生 XML 形式的报表数据
///编译条件参数定义在项目属性的“生成->条件编译符号”里更合适，这样可以为整个项目使用
///_XML_REPORT_DATA：指定产生 XML 形式的报表数据
///_JSON_REPORT_DATA：指定产生 JSON 形式的报表数据。
//#define _XML_REPORT_DATA
#define _JSON_REPORT_DATA

using System;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Text;
using System.Diagnostics;

namespace Ayma.Application.Web
{

#if _JSON_REPORT_DATA
    using MyDbReportData = DatabaseJsonReportData;

#else
using MyDbReportData = DatabaseXmlReportData;
#endif

    /// <summary>
    /// 在这里集中产生整个项目的所有报表需要的 XML 或 JSON 文本数据 
    /// </summary>
    public class DataTextProvider
    {
        /// <summary>
        /// 根据查询SQL语句产生报表数据
        /// </summary>
        public static string Build(string QuerySQL)
        {
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        /// <summary>
        /// 根据多条查询SQL语句产生报表数据，数据对应多记录集
        /// </summary>
        public static string Build(ArrayList QueryList)
        {
            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        #region 产生特定的报表数据文本

        #region DEMO

        public static string Customer()
        {
            return MyDbReportData.TextFromOneSQL("SELECT * FROM B_Employee");
        }

        public static string AppendBlankRow()
        {
            string QuerySQL = string.Format(
                "select m.OrderId, m.OrderDate, d.Productid,p.ProductName,d.Quantity," +
                "d.UnitPrice*d.Quantity as Amount " +
                "from orders m inner join (OrderDetails d inner join Products p on d.ProductID=p.ProductID) " +
                "on m.orderid=d.orderid " +
                "where (m.OrderDate between {0}1996-1-1{0} And {0}1997-9-30{0}) and d.Productid<10 " +
                "order by d.ProductID", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string Categories()
        {
            return MyDbReportData.TextFromOneSQL("select * from categories");
        }

        public static string ContractOne()
        {
            const string QuerySQL =
                "select m.OrderID,m.CustomerId,c.CompanyName,m.OrderDate, "
                + "p.ProductName,d.UnitPrice,d.Quantity,d.UnitPrice*d.Quantity as Amount "
                + "from (Orders m inner join "
                + "(OrderDetails as d inner join Products p on P.ProductID=D.ProductID) on m.OrderId=d.OrderId) "
                + "left join Customers c on c.CustomerID=m.CustomerID "
                + "where m.OrderID=10252 and d.ProductID=20 "
                + "order by m.OrderDate, m.OrderID";

            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string CrossTab()
        {
            const string QuerySQL = "select c.City,m.CustomerId,c.CompanyName,d.ProductID,p.ProductName," +
                                    "d.Quantity, d.UnitPrice*d.Quantity as Amount " +
                                    "from (Orders m inner join " +
                                    "(OrderDetails as d inner join Products p " +
                                    "on P.ProductID=D.ProductID) on m.OrderId=d.OrderId) " +
                                    "left join Customers c on c.CustomerID=m.CustomerID " +
                                    "where d.ProductID<8 " +
                                    "order by c.City,m.CustomerId, d.ProductID";

            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string CrossTabByDay()
        {
            string QuerySQL = string.Format("select c.CompanyName,m.OrderDate,d.UnitPrice*d.Quantity as Amount " +
                                            "from (Orders m inner join OrderDetails as d on m.OrderId=d.OrderId) " +
                                            "left join Customers c on c.CustomerID=m.CustomerID " +
                                            "where m.OrderDate between {0}1997-6-1{0} and {0}1997-7-15{0} " +
                                            "order by c.CompanyName, m.OrderDate", DatabaseReportData.DateSqlBracketChar);

            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string CrossTabByMonth()
        {
            string QuerySQL = string.Format("select c.CompanyName,m.OrderDate,d.UnitPrice*d.Quantity as Amount " +
                                            "from (Orders m inner join OrderDetails as d on m.OrderId=d.OrderId) " +
                                            "left join Customers c on c.CustomerID=m.CustomerID " +
                                            "where m.OrderDate between {0}1997-1-1{0} and {0}1997-12-31{0} " +
                                            "order by c.CompanyName, m.OrderDate", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string CrossTabCalendar()
        {
            string QuerySQL = string.Format(
                "select m.OrderDate,sum(d.Quantity) as Qty,sum(d.UnitPrice*d.Quantity) as Amount " +
                "from (Orders m inner join OrderDetails as d on m.OrderId=d.OrderId) " +
                "where m.OrderDate between {0}1997-1-1{0} and {0}1997-12-31{0} " +
                "group by m.OrderDate " +
                "order by m.OrderDate", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string CrossTabSubtotal()
        {
            string QuerySQL = string.Format(
                "select t.CategoryName, p.ProductName,c.City,c.CompanyName,d.Quantity " +
                "from (Orders m inner join  " +
                "(OrderDetails as d inner join (Products p inner join Categories t on p.CategoryID=t.CategoryID) " +
                "on P.ProductID=D.ProductID) on m.OrderId=d.OrderId) " +
                "left join Customers c on c.CustomerID=m.CustomerID " +
                "where m.OrderDate between {0}1997-1-1{0} and {0}1997-3-31{0} " +
                "order by t.CategoryName,p.ProductName,c.City,c.CompanyName ", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string CrossTabYearMonth()
        {
            string QuerySQL =
                "select Year(m.OrderDate) As TheYear,Month(m.OrderDate) As TheMonth, sum(d.UnitPrice*d.Quantity) as Amount " +
                "from Orders m inner join OrderDetails as d on m.OrderId=d.OrderId " +
                "group by Year(m.OrderDate),Month(m.OrderDate) " +
                "order by Year(m.OrderDate),Month(m.OrderDate)";
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string EmployeeOne()
        {
            const string QuerySQL = "select * from Employees where EmployeeID=5";
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string FreeGridwithDetailGrid()
        {
            //第一个查询SQL串指定报表明细数据的查询SQL
            //第二个查询SQL串指定报表参数数据的查询SQL
            const string RecordsetQuerySQL = "select * from Employees where EmployeeID<8";
            const string ParameterQuerySQL = "select * from Employees where EmployeeID=8";

            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem(RecordsetQuerySQL, "Detail"));
            QueryList.Add(new ReportQueryItem(ParameterQuerySQL, "FreeGrid"));

            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string InvoiceMany()
        {
            const string QuerySQL =
                "select m.OrderID,m.CustomerId,c.CompanyName,C.Address,m.OrderDate,c.ContactName+c.Phone as Remark, " +
                "d.ProductID,p.ProductName,d.UnitPrice,d.Quantity,d.UnitPrice*d.Quantity as Amount " +
                "from (Orders m inner join (OrderDetails d inner join Products p on p.ProductID=d.ProductID) " +
                "on d.OrderID=m.OrderID) left join Customers c on c.CustomerID=m.CustomerID " +
                "where m.OrderID>=10255 and m.OrderID<10260 ";
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string InvoiceOne()
        {
            //第一个查询SQL串指定报表明细数据的查询SQL
            //第二个查询SQL串指定报表参数数据的查询SQL
            const string RecordsetQuerySQL =
                "select d.ProductID,p.ProductName,d.UnitPrice,d.Quantity,d.UnitPrice*d.Quantity as Amount "
                + "from OrderDetails as d inner join Products p on P.ProductID=D.ProductID "
                + "where d.OrderID=10255";
            const string ParameterQuerySQL =
                "select m.OrderID,m.CustomerId,c.CompanyName,C.Address,m.OrderDate,c.ContactName+c.Phone as Remark "
                + "from Orders m left join Customers c on c.CustomerID=m.CustomerID "
                + "where m.OrderID=10255";

            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem(RecordsetQuerySQL, "Detail"));
            QueryList.Add(new ReportQueryItem(ParameterQuerySQL, "Master"));

            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string Picture()
        {
            const string QuerySQL = "select EmployeeID,LastName,FirstName,Title,TitleOfCourtesy,BirthDate,HireDate," +
                                    "Address,City,Region,PostalCode,Country,HomePhone,Extension,Photo,Notes from Employees";

            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string RTFSample()
        {
            string QuerySQL =
                string.Format(
                    "select m.OrderID,m.CustomerId,c.CompanyName,c.ContactName,c.Address,c.city,c.Region,c.Country,c.Postalcode," +
                    "m.OrderDate,M.Freight,d.ProductID,p.ProductName," +
                    "d.UnitPrice,d.Quantity,d.Discount," +
                    "d.UnitPrice*d.Quantity as Amount," +
                    "d.UnitPrice*d.Quantity*d.Discount as DiscountAmt," +
                    "d.UnitPrice*d.Quantity-d.UnitPrice*d.Quantity*d.Discount as NetAmount " +
                    "from (Orders m inner join " +
                    "(OrderDetails as d inner join Products p on P.ProductID=D.ProductID) on m.OrderId=d.OrderId) " +
                    "left join Customers c on c.CustomerID=m.CustomerID " +
                    "where m.OrderDate between {0}1997-1-1{0} And {0}1997-1-15{0} " +
                    "order by m.CustomerID,m.OrderDate, m.OrderID", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string SaleByProduct()
        {
            string QuerySQL = string.Format(
                "select m.OrderID,m.OrderDate, " +
                "d.ProductID,p.ProductName,d.UnitPrice,d.Quantity,d.UnitPrice*d.Quantity as Amount  " +
                "from Orders m inner join  " +
                "(OrderDetails as d inner join Products p on P.ProductID=D.ProductID) on m.OrderId=d.OrderId " +
                "where m.OrderDate between {0}1997-6-1{0} and {0}1997-12-31{0} " +
                "order by d.ProductID, m.OrderDate", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string SaleDetail()
        {
            const string QuerySQL = "select m.OrderID,m.CustomerId,c.CompanyName,m.OrderDate,M.Freight," +
                                    "d.ProductID,p.ProductName,d.UnitPrice,d.Quantity,d.Discount, " +
                                    "d.UnitPrice*d.Quantity as Amount, d.UnitPrice*d.Quantity*d.Discount as DiscountAmt, " +
                                    "d.UnitPrice*d.Quantity-d.UnitPrice*d.Quantity*d.Discount as NetAmount " +
                                    "from (Orders m inner join " +
                                    "(OrderDetails as d inner join Products p on P.ProductID=D.ProductID) on m.OrderId=d.OrderId) " +
                                    "left join Customers c on c.CustomerID=m.CustomerID " +
                                    "where m.OrderID<=10300 " +
                                    "order by m.OrderDate, m.OrderID";
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string SaleSumByProduct()
        {
            string QuerySQL = string.Format(
                "select d.Productid,p.ProductName,sum(d.Quantity) as Quantity, " +
                "sum(d.UnitPrice*d.Quantity*(1-d.Discount)) as Amount " +
                "from orders m inner join (OrderDetails d inner join Products p " +
                "on d.ProductID=p.ProductID) " +
                "on m.orderid=d.orderid " +
                "where m.OrderDate between {0}1997-1-1{0} and {0}1997-12-31{0} " +
                "group by d.Productid,p.ProductName " +
                "order by d.Productid", DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string SubReport_4a()
        {
            const string Top10CustomerQuerySQL =
                "select top 10 c.CustomerID, c.CompanyName, sum(o.Quantity*o.UnitPrice) As SumAmt " +
                "from OrderDetails o, Orders m, customers c " +
                "where o.OrderID=m.OrderID and m.CustomerID=c.CustomerID " +
                "group by c.CustomerID, c.CompanyName " +
                "order by sum(o.Quantity*o.UnitPrice) desc";
            const string Top10ProductQuerySQL =
                "select top 10 p.ProductID, p.ProductName, sum(o.Quantity*o.UnitPrice) As SumQty " +
                "from OrderDetails o, Products p " +
                "where o.ProductID=p.ProductID " +
                "group by p.ProductID, p.ProductName " +
                "order by sum(Quantity*o.UnitPrice) desc";

            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem("select * from Customers order by CustomerID", "Customer"));
            QueryList.Add(new ReportQueryItem("select * from Products order by ProductName", "Product"));
            QueryList.Add(new ReportQueryItem(Top10CustomerQuerySQL, "Top10Customer"));
            QueryList.Add(new ReportQueryItem(Top10ProductQuerySQL, "Top10Product"));
            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string SubReport_4b()
        {
            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem("select * from Customers order by CustomerID", "Customer"));
            QueryList.Add(new ReportQueryItem("select * from Products order by ProductName", "Product"));
            QueryList.Add(new ReportQueryItem("select * from Customers order by CustomerID", "Customer2"));
            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string SubReport_4c()
        {
            const string RelateCustomerQuerySQL =
                "select o.OrderID, o.ShipCity, c.* from Customers c, Orders o " +
                "where OrderID<=10260 and c.City=o.ShipCity " +
                "order by o.OrderID";

            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem("select * from Orders where OrderID<=10260 order by OrderID", "Master"));
            QueryList.Add(new ReportQueryItem("select * from OrderDetails where OrderID<=10260", "Detail1"));
            QueryList.Add(new ReportQueryItem(RelateCustomerQuerySQL, "Detail2"));

            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string SubReport_4d(string city)
        {
            string CustomerQuerySQL = "select * from Customers where City='" + city + "'";
            string SupplierQuerySQL = "select * from Suppliers where City='" + city + "'";

            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem(CustomerQuerySQL, "Customer"));
            QueryList.Add(new ReportQueryItem(SupplierQuerySQL, "Supplier"));

            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string Report_7_3g(int BeginNo, int EndNo)
        {
            string QuerySQL = string.Format("select * from Products " +
                                            "where ProductID>={0} and ProductID<={1} " +
                                            "order by ProductID", BeginNo, EndNo);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string Chart_8b()
        {
            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem("select * from scatter order by Name, X", "Table1"));
            QueryList.Add(new ReportQueryItem("select * from scatter order by Name, X", "Table2"));
            QueryList.Add(new ReportQueryItem("select * from scatter order by Name, X", "Table3"));
            QueryList.Add(new ReportQueryItem("select * from scatter order by Name, X", "Table4"));
            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string Chart_8d()
        {
            string SQL = "select c.Region,  d.ProductID,p.ProductName, " +
                         "sum(d.UnitPrice * d.Quantity) as Amount " +
                         "from(Orders m inner join (OrderDetails as d inner join Products p on P.ProductID = D.ProductID) on m.OrderId = d.OrderId) " +
                         "left join Customers c on c.CustomerID = m.CustomerID " +
                         "where d.ProductID in (1, 10, 11, 21) and m.OrderDate between #1997/1/1# and #1997/12/31# " +
                         "group by c.Region, d.ProductID, p.ProductName " +
                         "order by d.ProductID, c.Region";
            string SQL2 = "select c.Region, sum(d.UnitPrice * d.Quantity) as Amount, sum(d.Quantity) as Quantity " +
                          "from(Orders m inner join OrderDetails d on m.OrderId = d.OrderId) " +
                          "left join Customers c on c.CustomerID = m.CustomerID " +
                          "where d.ProductID = 11 and m.OrderDate between #1997/1/1# and #1997/12/31# " +
                          "group by c.Region " +
                          "order by c.Region";

            ArrayList QueryList = new ArrayList();
            QueryList.Add(new ReportQueryItem(SQL, "Table1"));
            QueryList.Add(new ReportQueryItem(SQL, "Table2"));
            QueryList.Add(new ReportQueryItem(SQL, "Table3"));
            QueryList.Add(new ReportQueryItem(SQL2, "Table4"));
            return MyDbReportData.TextFromMultiSQL(QueryList);
        }

        public static string FilterSaleSummary(string BeginDate, string EndDate)
        {
            string QuerySQL = string.Format("select d.Productid,p.ProductName,sum(d.Quantity) as Quantity," +
                                            "sum(d.UnitPrice*d.Quantity) as Amount " +
                                            "from orders m inner join (OrderDetails d inner join Products p " +
                                            "on d.ProductID=p.ProductID) on m.orderid=d.orderid " +
                                            "where m.OrderDate between {2}{0}{2} And {2}{1}{2}" +
                                            "group by d.Productid,p.ProductName " +
                                            "order by d.Productid", BeginDate, EndDate,
                DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        public static string FilterSaleDetail(string BeginDate, string EndDate, string ProductID)
        {
            string QuerySQL = string.Format("select m.OrderId, m.OrderDate, d.Productid,p.ProductName,d.Quantity, " +
                                            "d.UnitPrice*d.Quantity as Amount " +
                                            "from orders m inner join (OrderDetails d inner join Products p on d.ProductID=p.ProductID) " +
                                            "on m.orderid=d.orderid " +
                                            "where (m.OrderDate between {3}{0}{3} And {3}{1}{3}) and d.Productid={2} " +
                                            "order by m.OrderDate ",
                BeginDate, EndDate, ProductID, DatabaseReportData.DateSqlBracketChar);
            return MyDbReportData.TextFromOneSQL(QuerySQL);
        }

        #endregion


        #endregion
        

        #region 根据 HTTP 请求中的参数生成报表数据，主要是为例子报表自动分配合适的数据生成函数

        /// <summary>
        /// 为了避免 switch 语句的使用，建立数据名称与数据函数的映射(map)
        /// 在 Global.asax 中创建映射，即在WEB服务启动时初始化映射数据
        /// </summary>

        //简单无参数报表数据的名称与函数映射表
        private delegate string SimpleDataFun();

        private static Dictionary<string, SimpleDataFun> SimpleDataFunMap = new Dictionary<string, SimpleDataFun>();

        //有参数报表数据的名称与函数映射表，参数来自 HttpRequest
        private delegate string SpecialDataFun(HttpRequest Request);

        private static Dictionary<string, SpecialDataFun> SpecialDataFunMap = new Dictionary<string, SpecialDataFun>();

        public static string BuildByHttpRequest(HttpRequest Request)
        {
            string DataText;
            string DataName = Request.QueryString["data"];

            Trace.Assert(SimpleDataFunMap.Count > 0, "DataFunMap isn't initialized!");

            if (DataName != null) //if (DataName != "")
            {
                //根据数据名称查找映射表，如果找到，执行对应的报表数据函数获取数据
                SimpleDataFun simpleFun;
                SpecialDataFun specialFun;
                if (SimpleDataFunMap.TryGetValue(DataName, out simpleFun))
                {
                    DataText = simpleFun();
                }
                else if (SpecialDataFunMap.TryGetValue(DataName, out specialFun))
                {
                    DataText = specialFun(Request);
                }
                else
                {
                    throw new Exception(string.Format("没有为报表数据 '{0}' 分配处理程序！", DataName));
                }
            }
            else
            {
                string QuerySQL = Request.QueryString["QuerySQL"];
                if (QuerySQL != null)
                {
                    //根据传递的 HTTP 请求中的查询SQL获取数据
                    DataText = DataTextProvider.Build(QuerySQL);
                }
                else if (Request.TotalBytes > 0)
                {
                    //从客户端发送的数据包中获取报表查询参数，URL有长度限制，当要传递的参数数据量比较大时，应该采用这样的方式
                    //这里演示了用这样的方式传递一个超长查询SQL语句。
                    byte[] FormData = Request.BinaryRead(Request.TotalBytes);
                    UTF8Encoding Unicode = new UTF8Encoding();
                    int charCount = Unicode.GetCharCount(FormData, 0, Request.TotalBytes);
                    char[] chars = new Char[charCount];
                    int charsDecodedCount = Unicode.GetChars(FormData, 0, Request.TotalBytes, chars, 0);

                    QuerySQL = new String(chars);

                    DataText = DataTextProvider.Build(QuerySQL);
                }
                else
                {
                    DataText = "";
                }
            }

            return DataText;
        }



        //初始化映射表(map)，在 Global.asax 中被调用
        public static void InitDataFunMap()
        {
            Trace.Assert(SimpleDataFunMap.Count <= 0, "DataFunMap already initialized!");

            #region DEMO

            SimpleDataFunMap.Add("AppendBlankRow", AppendBlankRow);
            SimpleDataFunMap.Add("Categories", Categories);
            SimpleDataFunMap.Add("Chart_8b", Chart_8b);
            SimpleDataFunMap.Add("Chart_8d", Chart_8d);
            SimpleDataFunMap.Add("ContractOne", ContractOne);
            SimpleDataFunMap.Add("CrossTab", CrossTab);
            SimpleDataFunMap.Add("CrossTabByDay", CrossTabByDay);
            SimpleDataFunMap.Add("CrossTabByMonth", CrossTabByMonth);
            SimpleDataFunMap.Add("CrossTabCalendar", CrossTabCalendar);
            SimpleDataFunMap.Add("CrossTabSubtotal", CrossTabSubtotal);
            SimpleDataFunMap.Add("CrossTabYearMonth", CrossTabYearMonth);
            SimpleDataFunMap.Add("Customer", Customer);
            SimpleDataFunMap.Add("EmployeeOne", EmployeeOne);
            SimpleDataFunMap.Add("FreeGridwithDetailGrid", FreeGridwithDetailGrid);
            SimpleDataFunMap.Add("InvoiceMany", InvoiceMany);
            SimpleDataFunMap.Add("InvoiceOne", InvoiceOne);
            SimpleDataFunMap.Add("Picture", Picture);
            SimpleDataFunMap.Add("RTFSample", RTFSample);
            SimpleDataFunMap.Add("SaleByProduct", SaleByProduct);
            SimpleDataFunMap.Add("SaleDetail", SaleDetail);
            SimpleDataFunMap.Add("SaleSumByProduct", SaleSumByProduct);
            SimpleDataFunMap.Add("SubReport_4a", SubReport_4a);
            SimpleDataFunMap.Add("SubReport_4b", SubReport_4b);
            SimpleDataFunMap.Add("SubReport_4c", SubReport_4c);

            SpecialDataFunMap.Add("Report_7_3g", Report_7_3g);
            SpecialDataFunMap.Add("SubReport_4d", SubReport_4d);
            SpecialDataFunMap.Add("FilterSaleSummary", FilterSaleSummary);
            SpecialDataFunMap.Add("FilterSaleDetail", FilterSaleDetail);

            #endregion

        }
        
        #region DEMO

        public static string SubReport_4d(HttpRequest Request)
        {
            return SubReport_4d(Request.QueryString["city"]);
        }

        public static string Report_7_3g(HttpRequest Request)
        {
            return Report_7_3g(Convert.ToInt32(Request.QueryString["BeginNo"]),
                Convert.ToInt32(Request.QueryString["EndNo"]));
        }

        public static string FilterSaleSummary(HttpRequest Request)
        {
            return FilterSaleSummary(Request.QueryString["BeginDate"], Request.QueryString["EndDate"]);
        }

        public static string FilterSaleDetail(HttpRequest Request)
        {
            return FilterSaleDetail(Request.QueryString["BeginDate"], Request.QueryString["EndDate"],
                Request.QueryString["ProductID"]);
        }

        #endregion

        #endregion
    }
}