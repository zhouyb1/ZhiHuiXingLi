using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ayma.DataBase.Repository;
using Ayma.Util;

namespace Ayma.Application.TwoDevelopment.TwoDev.OpinionFeedback
{
    public class T_OpinionFeedbackService:RepositoryFactory
    {
        public void SaveEntity(string keyValue,T_OpinionFeedbackEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    entity.Modify(keyValue);
                    this.BaseRepository().Update(entity);
                }
                else
                {
                    entity.Create();
                    this.BaseRepository().Insert(entity);
                }
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
    }
}
