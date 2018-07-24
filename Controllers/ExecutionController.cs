using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Mvc;

using AutoDashV2.Models;

using Microsoft.Ajax.Utilities;

namespace AutoDashV2.Controllers
{
    public class ExecutionController : Controller
    {
        // GET: Execution
        public ActionResult Index()
        {
            return View();
        }

        // GET: Execution/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Execution/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Execution/Create
        [System.Web.Mvc.HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Execution/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Execution/Edit/5
        [System.Web.Mvc.HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Execution/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Execution/Delete/5
        [System.Web.Mvc.HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
