using System.Web;
using System.Web.Optimization;

namespace AutoDashV2
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            //Angular js
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/*.js"));
            //"~/Scripts/angular-animate.js",
            //"~/Scripts/angular-material.js",
            //"~/Scripts/angular-aria.js",
            //"~/Scripts/angular-messages.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/app.js",
                "~/Scripts/ng-csv.js",
                "~/Scripts/Custom/angular-material.js",
                "~/Scripts/app/Execution/*.js",
                "~/Scripts/app/Metrics/*.js",
                "~/Scripts/app/Status/*.js",
                "~/Scripts/app/TestFilters/*.js",
                "~/Scripts/app/TestRuns/*.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/bootstrap-notify.js",
                "~/Scripts/respond.js",
                "~/Scripts/prism.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                   "~/Content/font-awesome.css",
                   "~/Content/bootstrap.css",
                   "~/Content/site.css",
                   "~/Content/prism.css",
                   "~/Content/angular-material.css"));
        }
    }
}
