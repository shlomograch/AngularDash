using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

using AutoDashV2.Models;

namespace AutoDashV2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        private TestResultsFlatModel db = new TestResultsFlatModel();


        public class TestModel
        {
            public string TestResult { get; set; }
            public string TestRunKey { get; set; }
        }

        [HttpPost]
        public JsonResult Test(string testRunKey)
        {
            var testKey = int.Parse(testRunKey);
            try
            {
                var testResults = db.TestResultsFlats.Where(x => x.TestRunKey == testKey).OrderBy(x => x.TestResultKey).ToList();

                if (testResults.Count == 0)
                {
                    var noData = new TestResultsFlat
                    {
                        TestRunKey = testKey,
                        Expected = "No Data Found",
                        Actual = "No data Loaded",
                        ResultStatus = "Info"
                    };
                    testResults.Add(noData);
                }

                foreach (var item in testResults)
                {
                    if (item.Expected == null)
                    {
                        item.Expected = "";
                    }

                    var replace = item.Expected
                        .Replace("&", "&amp;")
                        .Replace("<", "&lt;")
                        .Replace(">", "&gt;");
                    item.Expected = replace;

                    if ((item.Expected.Contains("http://") || item.Expected.Contains("https://")) && !item.Expected.Contains("nelnet"))
                    {
                        Regex urlRx = new
                            Regex(@"(http|ftp|https)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?",
                                RegexOptions.IgnoreCase);

                        MatchCollection matches = urlRx.Matches(item.Expected);
                        foreach (Match match in matches)
                        {
                            if (match.Value.Contains("dequeuniversity"))
                            {
                                var expectedReplace = item.Expected.Replace(match.Value, "<a href=\"" + match.Value + "\" target=\"_blank\">AXE Documentation Link</a>");
                                item.Expected = expectedReplace;
                            }
                            else
                            {
                                var expectedReplace = item.Expected.Replace(match.Value, "<a href=\"" + match.Value + $"\" target=\"_blank\">{match.Value}</a>");
                                item.Expected = expectedReplace;
                            }


                        }
                    }


                    replace = item.Actual
                        .Replace("&", "&amp;")
                        .Replace("<", "&lt;")
                        .Replace(">", "&gt;");
                    item.Actual = replace;
                }
                return Json(testResults);
            }
            catch (Exception exception)
            {
                var testResults = new List<TestResultsFlat>();

                var z = new TestResultsFlat
                {
                    TestRunKey = testKey,
                    Expected = "No Data Found",
                    Actual = "No data Loaded",
                    ResultStatus = "Fail"
                };
                testResults.Add(z);
                return Json(testResults);
            }

        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}