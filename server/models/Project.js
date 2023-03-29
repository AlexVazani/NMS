import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectId: { type: Number, required: true },
    projectTitle: { type: String, required: true },
    spaceType: { type: String },
    spaceSize: { type: Number },
    spaceLocation: { type: String },
    clientName: { type: String },
    clientPhone: { type: String },
    projectManager: { type: String },
    projectPrice: { type: Number },
    projectStatus: { type: String },
    projectDescription: { type: String },
  },
  { timestamps: true }
);

ProjectSchema.statics.getNextSequence = async function () {
  const project = await this.findOne().sort({ projectId: -1 });
  const nextProjectId = project ? project.projectId + 1 : 1;
  return nextProjectId;
};

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
