///下面三个编译条件参数指定产生报表数据需要连接的数据库。如果都不定义，则用 OLEDB 数据驱动连接数据库
///编译条件参数定义在项目属性的“生成->条件编译符号”里更合适，这样可以为整个项目使用
///_OLEDB_REPORT_DS：指定用 OLEDB 数据驱动连接数据库
///_MSSQL_REPORT_DS：指定用 Microsoft SQL Server 数据驱动连接数据库
///_ORACLE_REPORT_DS：指定用 Oracle 数据驱动连接数据库
//#define _OLEDB_REPORT_DS
#define _MSSQL_REPORT_DS
//#define _ORACLE_REPORT_DS

using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;

namespace Ayma.Application.Web
{

#if _ORACLE_REPORT_DS
//using System.Data.OracleClient;
using MyDbConnection = System.Data.OracleClient.OracleConnection;
using MyDbCommand = System.Data.OracleClient.OracleCommand;
using MyDbDataReader = System.Data.OracleClient.OracleDataReader;
using MyDbDataAdapter = System.Data.OracleClient.OracleDataAdapter;
#elif _MSSQL_REPORT_DS
//using System.Data.SqlClient;
using MyDbConnection = System.Data.SqlClient.SqlConnection;
using MyDbCommand = System.Data.SqlClient.SqlCommand;
using MyDbDataReader = System.Data.SqlClient.SqlDataReader;
using MyDbDataAdapter = System.Data.SqlClient.SqlDataAdapter;
#else
//using System.Data.OleDb;
using MyDbConnection = System.Data.OleDb.OleDbConnection;
using MyDbCommand = System.Data.OleDb.OleDbCommand;
using MyDbDataReader = System.Data.OleDb.OleDbDataReader;
using MyDbDataAdapter = System.Data.OleDb.OleDbDataAdapter;
#endif //#ifdef OLE_DB

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //class  DatabaseReportData 产生提供给报表生成需要的 XML 或 JSON 数据
    public class DatabaseReportData
    {
        //★特别提示★：数据库连接串，一定要改为实际的参数值
#if _ORACLE_REPORT_DS
    public const string DbConnStr = "Data Source=dbmachine;Persist Security Info=True;User ID=hr;Password=hr;Unicode=True;";

    public const char DateSqlBracketChar = '\'';
#elif _MSSQL_REPORT_DS
    //连接SQL Server数据库的连接串，应该修改为与实际一致。如果是运行Grid++Report本身的例子，应该首先附加例子数据库到
    //SQL Server2000/2005数据库上。
        public static string DbConnStr = ConfigurationManager.ConnectionStrings["BaseDb"].ConnectionString;

    //定义在SQL中表示日期值的包围符号，Access用“#”, 而MS SQl Server用“'”，为了生成两者都可用的查询SQL语句，将其参数化定义出来。这样处理只是为了演示例子方便
    public const char DateSqlBracketChar = '\'';
#else
        //连接Grid++Report Access例子数据库的连接串，应该修改为与实际一致，如果安装目录不在C:\Grid++Report 6，应进行修改。
        //如果是运行为64位程序，连接串应该改为64位的，Provider为“Microsoft.ACE.OLEDB.12.0”
        //另64位的驱动不是Windows系统自带的，需要从微软官网下载安装，具体见帮助文档“开发指南->报表数据源->设计时报表数据源->连接 Access”中的说明
        public const string DbConnStr = @"Provider=Microsoft.Jet.OLEDB.4.0;User ID=Admin;Data Source=C:\Grid++Report 6\Samples\Data\Northwind.mdb";

        //定义在SQL中表示日期值的包围符号，Access用“#”, 而MS SQl Server用“'”，为了生成两者都可用的查询SQL语句，将其参数化定义出来。这样处理只是为了演示例子方便
        public const char DateSqlBracketChar = '#';
#endif //#ifdef OLE_DB

        //根据查询SQL,产生提供给报表生成需要的 XML 数据，字段值为空也产生数据
        public static void FullGenNodeXmlData(HttpResponse Response, string QuerySQL, bool ToCompress)
        {
            MyDbCommand ReportDataCommand = new MyDbCommand(QuerySQL, ReportConn);
            MyDbDataReader ReportDataReader = ReportDataCommand.ExecuteReader();
            string Text = XMLReportData.FromDataReader(ReportDataReader);
            GridReportDataResponse.Response(Response, Text, ToCompress ? ResponseDataType.ZipBinary : ResponseDataType.PlainText);
        }

        //获取 Count(*) SQL 查询到的数据行数。参数 QuerySQL 指定获取报表数据的查询SQL
        public static int BatchGetDataCount(string QuerySQL)
        {
            int Total = 0;

            MyDbCommand ReportDataCommand = new MyDbCommand(QuerySQL, ReportConn);
            MyDbDataReader ReportDataReader = ReportDataCommand.ExecuteReader();
            if (ReportDataReader.Read())
                Total = ReportDataReader.GetInt32(0);

            return Total;
        }

        #region protected function
        private static object dbcLock = new Object();

        private static MyDbConnection _ReportConn = null;

        protected static MyDbConnection ReportConn
        {
            get
            {
                lock (dbcLock)
                {
                    if (_ReportConn == null)
                    {
                        _ReportConn = new MyDbConnection(DbConnStr);
                        _ReportConn.Open();
                    }
                }
                return _ReportConn;
            }
        }
        #endregion protected function
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //class  DatabaseXmlReportData 根据SQL产生报表需要的 XML 数据
    public class DatabaseXmlReportData : DatabaseReportData
    {
        public static string TextFromOneSQL(string QuerySQL)
        {
            DataSet ReportDataSet = new DataSet();

            MyDbDataAdapter ReportDataAdapter = new MyDbDataAdapter(QuerySQL, ReportConn);

            ReportDataAdapter.Fill(ReportDataSet);

            return XMLReportData.FromDataSet(ReportDataSet);
        }

        public static string TextFromMultiSQL(ArrayList QueryList)
        {
            DataSet ReportDataSet = new DataSet();

            foreach (ReportQueryItem item in QueryList)
            {
                MyDbDataAdapter DataAdapter = new MyDbDataAdapter(item.QuerySQL, ReportConn);

                DataAdapter.Fill(ReportDataSet, item.RecordsetName);
            }

            return XMLReportData.FromDataSet(ReportDataSet);
        }

        public static void GenOneRecordset(HttpResponse Response, string QuerySQL)
        {
            string Text = TextFromOneSQL(QuerySQL);
            GridReportDataResponse.Response(Response, Text, GridReportDataResponse.DefaultDataType);
        }

        public static void GenMultiRecordset(HttpResponse Response, ArrayList QueryList)
        {
            string Text = TextFromMultiSQL(QueryList);
            GridReportDataResponse.Response(Response, Text, GridReportDataResponse.DefaultDataType);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //class  DatabaseJsonReportData 根据SQL产生报表需要的 JSON 数据
    public class DatabaseJsonReportData : DatabaseReportData
    {
        public static string TextFromOneSQL(string QuerySQL)
        {
            DataSet ReportDataSet = new DataSet();

            MyDbDataAdapter ReportDataAdapter = new MyDbDataAdapter(QuerySQL, ReportConn);

            ReportDataAdapter.Fill(ReportDataSet);

            return JSONReportData.FromDataSet(ReportDataSet);
        }

        public static string TextFromMultiSQL(ArrayList QueryList)
        {
            DataSet ReportDataSet = new DataSet();

            foreach (ReportQueryItem item in QueryList)
            {
                MyDbDataAdapter DataAdapter = new MyDbDataAdapter(item.QuerySQL, ReportConn);

                DataAdapter.Fill(ReportDataSet, item.RecordsetName);
            }

            return JSONReportData.FromDataSet(ReportDataSet);
        }

        public static void GenOneRecordset(HttpResponse Response, string QuerySQL)
        {
            string Text = TextFromOneSQL(QuerySQL);
            GridReportDataResponse.Response(Response, Text, GridReportDataResponse.DefaultDataType);
        }

        public static void GenMultiRecordset(HttpResponse Response, ArrayList QueryList)
        {
            string Text = TextFromMultiSQL(QueryList);
            GridReportDataResponse.Response(Response, Text, GridReportDataResponse.DefaultDataType);
        }
    }
}
