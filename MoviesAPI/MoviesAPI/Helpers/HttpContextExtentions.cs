using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Helpers
{
    public static class HttpContextExtentions
    {
        public async static Task InsertParametersPaginationInHeader<T>(this HttpContext httpcontext,
            IQueryable<T> queryable)
        {
            if (httpcontext == null) { throw new ArgumentNullException(nameof(httpcontext)); }

            double count = await queryable.CountAsync();
            httpcontext.Response.Headers.Add("totalAmountOfRecords", count.ToString());
        }
    }
}
