import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    reportStatus: { type: String, required: true },
    reportContent: { type: String, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

export default Report;