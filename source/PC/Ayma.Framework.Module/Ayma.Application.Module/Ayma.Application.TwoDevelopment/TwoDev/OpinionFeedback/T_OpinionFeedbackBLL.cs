using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ayma.Util;

namespace Ayma.Application.TwoDevelopment.TwoDev.OpinionFeedback
{
    public class T_OpinionFeedbackBLL:T_OpinionFeedbackIBLL
    {
        private T_OpinionFeedbackService service = new T_OpinionFeedbackService();
        public void SaveEntity(string keyValue,T_OpinionFeedbackEntity entity)
        {
            try
            {
                service.SaveEntity(keyValue, entity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
    }
}
