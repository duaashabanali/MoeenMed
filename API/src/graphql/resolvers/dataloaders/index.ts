import DataLoader from "dataloader";
import { Login } from "../../../database/auth/login";
import { getUsers, roleById } from "./userLoader";
import { Role } from "../../../database/role/role";
import { getPatient } from "./patient";
import { Patient } from "../../../database/patient/patient";
const cacheProp = { cache: true };
export const dataLoaders = {
  userLoader: new DataLoader<string, Login>(getUsers, cacheProp),
  roleLoader: new DataLoader<string, Role>(roleById, cacheProp),
  patientLoader: new DataLoader<string, Patient>(getPatient, cacheProp),
};
