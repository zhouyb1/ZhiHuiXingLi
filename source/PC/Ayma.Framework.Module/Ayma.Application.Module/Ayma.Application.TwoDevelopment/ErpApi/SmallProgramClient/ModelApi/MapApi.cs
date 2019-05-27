using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.ErpApi.SmallProgramClient.ModelApi
{

    public class From
    {
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
    }

    public class To
    {
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
    }

    public class ElementsItem
    {
        /// <summary>
        /// 
        /// </summary>
        public From from { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public To to { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int distance { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int duration { get; set; }
    }

    public class Result
    {
        /// <summary>
        /// 
        /// </summary>
        public List<ElementsItem> elements { get; set; }
    }

    public class Root
    {
        /// <summary>
        /// 
        /// </summary>
        public int status { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string message { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Result result { get; set; }
    }
}
