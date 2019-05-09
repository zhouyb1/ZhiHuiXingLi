using System;

namespace Ayma.Application.WeChat
{
    public interface IVerifyAttribute
    {
        bool Verify(Type type, object obj,out string message);
    }
}
