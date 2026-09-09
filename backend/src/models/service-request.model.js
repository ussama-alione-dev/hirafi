import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: String,
      required: true,
      trim: true,
    },
    goals: {
      type: String,
      default: "",
      trim: true,
    },
    expectedResult: {
      type: String,
      default: "",
      trim: true,
    },
    workflowState: {
      type: String,
      enum: ["intake", "planning", "implementation", "validation", "done"],
      default: "intake",
    },
    activePerspective: {
      type: String,
      enum: ["client", "artisan"],
      default: "client",
    },
    aiModel: {
      type: String,
      required: true,
      default: "gpt-5.3-codex",
    },
    notes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

export default ServiceRequest;
