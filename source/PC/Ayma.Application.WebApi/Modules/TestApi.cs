using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ayma.Util;
using Nancy;
using Nancy.ModelBinding;

namespace Ayma.Application.WebApi.Modules
{
    public class TestApi : BaseApi
    {
        public TestApi()
            : base("/ayma")
        {
            Post["/test"] = testapi;
        }

        public Response testapi(dynamic _)
        {
            ReqParameter<string> req = this.Bind<ReqParameter<string>>();
            LoginModel loginModel = this.GetReqData<LoginModel>();
            return Response.AsText("hello");
        }
	}
}