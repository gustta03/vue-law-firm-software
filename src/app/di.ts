import { makeRemoteLoadCases } from "../main/factories/usecases/cases/load-all-cases-factory";
import { makeRemoteLoadCustomer } from "../main/factories/usecases/customer/load-customer-factory";
import { makeRemoteDocument } from "../main/factories/usecases/documents/load-document-factory";
import { makeRemoteDeleteTask } from "../main/factories/usecases/workspace/delete-workspace-factory";
import { makeRemoteEditTask } from "../main/factories/usecases/workspace/edit-workspace-task-factory";
import { makeRemoteInsertTask } from "../main/factories/usecases/workspace/insert-workspace-factory";
import { makeRemoteGetWorkSpaces } from "../main/factories/usecases/workspace/load-workspace-tasks";
import { makeRemoteSaveCases } from "../main/factories/usecases/cases/save-case-factory";
import { makeRemoteSaveDocument } from "../main/factories/usecases/documents/save-document-factory";
import { makeRemoteDeleteDocument } from "../main/factories/usecases/documents/delete-document-factory";
import { makeRemoteDeleteCase } from "../main/factories/usecases/cases/delete-case-factory";
import { makeRemoteEditCase } from "../main/factories/usecases/cases/edit-case-factory";
import { makeRemoteEditCustomer } from "../main/factories/usecases/customer/edit-customer-factory";
import { makeRemoteDeleteCustomer } from "../main/factories/usecases/customer/delete-customer-factory";

export const dependencies = {
  getAllWorkSpace: makeRemoteGetWorkSpaces(),
  deleteWorkspaceTask: makeRemoteDeleteTask(),
  insertWorkSpaceTask: makeRemoteInsertTask(),
  editWorkSpaceTask: makeRemoteEditTask(),
  loadDocument: makeRemoteDocument(),
  loadCustomer: makeRemoteLoadCustomer(),
  loadCases: makeRemoteLoadCases(),
  saveCase: makeRemoteSaveCases(),
  saveDocument: makeRemoteSaveDocument(),
  deleteDocument: makeRemoteDeleteDocument(),
  deleteCase: makeRemoteDeleteCase(),
  editCase: makeRemoteEditCase(),
  editCustomer: makeRemoteEditCustomer(),
  deleteCustomer: makeRemoteDeleteCustomer()
};