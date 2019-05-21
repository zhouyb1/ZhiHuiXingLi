using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ayma.Application.TwoDevelopment.TwoDev.OpinionFeedback
{
    public interface T_OpinionFeedbackIBLL
    {
        void SaveEntity(string keyValue,T_OpinionFeedbackEntity entity);
    }
}
