import {
  createServiceRequest,
  updateWorkflowState,
  addWorkflowNote,
  getServiceRequestContext,
  listServiceRequests,
} from "../services/service-request.service.js";

export const createServiceRequestController = async (req, res, next) => {
  try {
    const request = await createServiceRequest(req.body);

    return res.status(201).json({
      success: true,
      data: request,
    });
  } catch (error) {
    return next(error);
  }
};

export const listServiceRequestsController = async (_req, res, next) => {
  try {
    const requests = await listServiceRequests();

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateWorkflowStateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { workflowState } = req.body;

    const request = await updateWorkflowState(id, workflowState);

    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    return next(error);
  }
};

export const addWorkflowNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const request = await addWorkflowNote(id, note);

    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    return next(error);
  }
};

export const getServiceRequestContextController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const context = await getServiceRequestContext(id);

    return res.status(200).json({
      success: true,
      data: context,
    });
  } catch (error) {
    return next(error);
  }
};
