import ServiceRequest from "../models/service-request.model.js";
import env from "../config/env.js";

const resolvePerspective = (workflowState) => {
  if (workflowState === "intake" || workflowState === "planning") {
    return "client";
  }

  return "artisan";
};

export const createServiceRequest = async (payload) => {
  const initialState = payload.workflowState || "intake";

  const request = await ServiceRequest.create({
    clientName: payload.clientName,
    projectTitle: payload.projectTitle,
    requirements: payload.requirements,
    goals: payload.goals || "",
    expectedResult: payload.expectedResult || "",
    workflowState: initialState,
    activePerspective: resolvePerspective(initialState),
    aiModel: env.aiModel,
    notes: payload.notes || [],
  });

  return request;
};

export const updateWorkflowState = async (id, workflowState) => {
  const request = await ServiceRequest.findById(id);

  if (!request) {
    const error = new Error("Service request not found");
    error.statusCode = 404;
    throw error;
  }

  request.workflowState = workflowState;
  request.activePerspective = resolvePerspective(workflowState);

  await request.save();
  return request;
};

export const addWorkflowNote = async (id, note) => {
  const request = await ServiceRequest.findById(id);

  if (!request) {
    const error = new Error("Service request not found");
    error.statusCode = 404;
    throw error;
  }

  request.notes.push(note);
  await request.save();

  return request;
};

export const getServiceRequestContext = async (id) => {
  const request = await ServiceRequest.findById(id).lean();

  if (!request) {
    const error = new Error("Service request not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    oneModelArchitecture: {
      artisanIsUser: true,
      singleModel: request.aiModel,
      activePerspective: request.activePerspective,
      workflowState: request.workflowState,
    },
    clientPerspective: {
      clientName: request.clientName,
      projectTitle: request.projectTitle,
      requirements: request.requirements,
      goals: request.goals,
      expectedResult: request.expectedResult,
    },
    artisanPerspective: {
      action:
        request.activePerspective === "artisan"
          ? "build_and_fix"
          : "analyze_requirements",
      notes: request.notes,
    },
  };
};

export const listServiceRequests = async () => {
  return ServiceRequest.find().sort({ createdAt: -1 }).lean();
};
