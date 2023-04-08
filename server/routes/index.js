import express from "express";

import {
  login,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

import {
  getInquiries,
  createInquiry,
  showInquiry,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiry.js";

import {
  getProjects,
  addProject,
  createProject,
  showProject,
  updateProject,
  deleteProject,
} from "../controllers/project.js";

import {
  createReport,
  deleteReport,
  getReports,
} from "../controllers/report.js";

import {
  getSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedule.js";

import {
  getInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.js";

import {
  getPartners,
  addPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partner.js";

const router = express.Router();

router.post("/login", login);
router.get("/auth", getUsers);
router.post("/auth", registerUser);
router.patch("/auth/:id", updateUser);
router.delete("/auth/:id", deleteUser);

router.get("/inquiries", getInquiries);
router.post("/inquiries", createInquiry);
router.get("/inquiries/:id", showInquiry);
router.patch("/inquiries/:id", updateInquiry);
router.delete("/inquiries/:id", deleteInquiry);

router.get("/projects", getProjects);
router.post("/projects/create", createProject);
router.post("/projects/:id", addProject);
router.get("/projects/:id", showProject);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.get("/reports", getReports);
router.post("/:id/reports", createReport);
router.delete("/:id/reports/:reportId", deleteReport);

router.get("/schedule", getSchedule);
router.post("/schedule", addSchedule);
router.patch("/schedule/:id", updateSchedule);
router.delete("/schedule/:id", deleteSchedule);

router.get("/invoices/:projectId?", getInvoices);
router.post("/invoices", addInvoice);
router.patch("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

router.get("/partners", getPartners);
router.post("/partners", addPartner);
router.patch("/partners/:id", updatePartner);
router.delete("/partners/:id", deletePartner);

export default router;
