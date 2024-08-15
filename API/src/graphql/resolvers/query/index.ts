import { getUserProfile, loginResolver } from "./auth/auth"; 
import { getPatientByPhoneNumber } from "./patient";
import { getRecording, getRecordingById } from "./recording";
import { changePassword, forgotPassword } from "./user/forgotPassword";

export const queryResolvers = {
    login: loginResolver,
    forgotPassword,
    changePassword,
    getRecording,
    getRecordingById,
    getUserProfile,
    getPatientByPhoneNumber,
};