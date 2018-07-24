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
    public class MyHub : Hub
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

        public MyHub()
        {
            // Create a Long running task to do an infinite loop which will keep sending the server time
            // to the clients every 3 seconds.
            var taskTimer = Task.Factory.StartNew(async () =>
                {
                    while (true)
                    {
                        // TODO: Create if statement so that if current test run key does not equal newest test run key... don't refresh.
                        vTestRunsFlatModel newModel = new vTestRunsFlatModel();
                        var b = newModel.vTestRunsFlats.OrderByDescending(x => x.TestRunKey).Take(100).ToListAsync();
                        var z = b.Result.ToList();

                        foreach (var item in z)
                        {
                            switch (item.TestRunStatus)
                            {
                                case "Pass":
                                    {
                                        item.Icon = "fa-check-circle";
                                        break;
                                    }
                                case "Info":
                                    {
                                        item.Icon = "Info Icon";
                                        break;
                                    }
                                case "Fail":
                                    {
                                        item.Icon = "Fail Icon";
                                        break;
                                    }
                                case "Warning":
                                    {
                                        item.Icon = "Warning Icon";
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }

                        }

                        var jsonSerializer = new JavaScriptSerializer();
                        var zz = jsonSerializer.Serialize(z);

                        string timeNow = DateTime.Now.ToString();
                        //Sending the server time to all the connected clients on the client method SendServerTime()
                        Clients.All.SendServerTime(z);

                        //Delaying by 3 seconds.
                        await Task.Delay(60000);
                    }
                }, TaskCreationOptions.LongRunning
            );
        }

        
        public void GetCurrentClients()
        {
            //Clients.Caller.sendData(Clients.All.);
        }

        public void SendMessageToClients(string message)
        {
            Clients.All.sendMessageToClients(message);
        }

        public void Hello()
        {
            //Clients.All.hello( $"$.notify('Hello World');");

            Random rand = new Random();
            Clients.All.hello($"Hello message to all clients - {rand.Next(0, 99)}");
        }
    }
}