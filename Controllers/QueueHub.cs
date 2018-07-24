using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Script.Serialization;
using AutoDashV2.Models;
using Microsoft.AspNet.SignalR;

namespace AutoDashV2.Controllers
{
    public class QueueHub : Hub
    {
        public static IHtmlString NoEncodeActionLink(HtmlHelper htmlHelper, string linkText, string action, object htmlAttributes)
        {
            UrlHelper urlHelper = new UrlHelper(htmlHelper.ViewContext.RequestContext);
            TagBuilder builder = new TagBuilder("a");
            builder.InnerHtml = linkText;
            builder.Attributes["href"] = urlHelper.Action(action);
            builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            return MvcHtmlString.Create(builder.ToString());
        }

        public QueueHub()
        {
            var taskTimer = Task.Factory.StartNew(async () =>
                {
                    while (true)
                    {
                        // TODO: Create if statement so that if current test run key does not equal newest test run key... don't refresh.
                        QueuedTestsModel queuedTests = new QueuedTestsModel();
                        var allQueuedTests = queuedTests.QueuedTests.OrderByDescending(x => x.Id).ToListAsync();
                        var queue = allQueuedTests.Result.ToList();

                        var jsonSerializer = new JavaScriptSerializer();
                        var serializedData = jsonSerializer.Serialize(queue);

                        string timeNow = DateTime.Now.ToString();
                        //Sending the server time to all the connected clients on the client method SendServerTime()
                        Clients.All.GetQueue(queue);

                        //Delaying by 3 seconds.
                        await Task.Delay(60000);
                    }
                }, TaskCreationOptions.LongRunning
            );
        }
        public void Hello()
        {
            //Clients.All.hello( $"$.notify('Hello World');");

            Random rand = new Random();
            Clients.All.hello($"Hello message to all clients from queue - {rand.Next(0, 99)}");
        }
    }
}