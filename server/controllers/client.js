import mongoose from "mongoose";
import Project from "../models/Project.js";
import Report from "../models/Report.js";
import Invoice from "../models/Invoice.js";

// Project
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    const count = await Project.countDocuments({});
    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    const response = { data: projects, totalCount: count };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const data = req.body;

    const projectId = await Project.getNextSequence();
    const newProject = new Project({ ...data, projectId });
    await newProject.save();

    res
      .status(201)
      .json({ message: "새 프로젝트가 생성되었습니다!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res
      .status(201)
      .json({ message: "프로젝트가 수정되었습니다!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    await Report.deleteMany({ projectId: id }, { session });
    await Invoice.deleteMany({ projectId: id }, { session });
    await Project.findByIdAndDelete(id, { session });
    await session.commitTransaction();

    res.status(201).json({ message: "프로젝트가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Report
export const createReport = async (req, res) => {
  try {
    const data = req.body;
    const { id: projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }

    const newReport = new Report({
      ...data,
      projectId,
      reportStatus: project.projectStatus,
    });
    await newReport.save();

    res
      .status(201)
      .json({ message: "New report is created!", report: newReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { projectId } = req.query;
    let query = {};

    if (projectId) {
      query.projectId = projectId;
    }

    const reports = await Report.find(query).populate(
      "projectId",
      "projectTitle"
    );

    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id, reportId } = req.params;

    await Report.findByIdAndDelete(reportId);

    res.status(201).json({ message: "리포트가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Invoice
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.status(200).json(invoices);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addInvoice = async (req, res) => {
  try {
    const data = req.body;

    const newInvoice = new Invoice(data);
    await newInvoice.save();

    res
      .status(201)
      .json({ message: "새 품의서가 생성되었습니다!", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newInvoice = await Invoice.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res
      .status(201)
      .json({ message: "품의서가 수정되었습니다!", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    await Invoice.findByIdAndDelete(id);

    res.status(201).json({ message: "품의서가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
