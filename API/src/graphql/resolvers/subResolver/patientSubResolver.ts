
import { Patient } from "../../../database/patient/patient";
import { dataLoaders } from "../dataloaders";

export const patientSubResolver = {
    userId: async (parent: Patient) => {
        if (parent.userId === null || parent.userId === undefined) return "";
        return dataLoaders.userLoader.clear(parent.userId).load(parent.userId);
    },
};