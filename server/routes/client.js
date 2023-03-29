import express from "express";
import {
  getProjects,
  createProject,
  showProject,
  updateProject,
  deleteProject,
  createReport,
  deleteReport,
  getReports,
  getInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/client.js";

const router = express.Router();

router.get("/projects", getProjects);
router.post("/projects/create", createProject);
router.get("/projects/:id", showProject);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.get("/reports", getReports);
router.post("/projects/:id/reports", createReport);
router.delete("/projects/:id/reports/:reportId", deleteReport);

router.get("/invoices", getInvoices);
router.post("/invoices", addInvoice);
router.patch("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;
