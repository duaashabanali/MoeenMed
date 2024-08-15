
import { Recording } from "../../../database/recording/recording";
import { dataLoaders } from "../dataloaders";

export const recordingSubResolver = {
    userId: async (parent: Recording) => {
        if (parent.userId === null || parent.userId === undefined) return "";
        return dataLoaders.userLoader.clear(parent.userId).load(parent.userId);
    },
    patient: async (parent: Recording) => {
        if (parent.patient === null || parent.patient === undefined) return "";
        return dataLoaders.patientLoader.clear(parent.patient).load(parent.patient);
    },
};