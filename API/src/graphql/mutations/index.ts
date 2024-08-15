import { createPatient } from "./patient/create";
import { createRecording } from "./recording/create";
import { signUpUser } from "./user/create";

export const mutationResolvers = {
    signUpUser,
    createRecording,
    createPatient
};