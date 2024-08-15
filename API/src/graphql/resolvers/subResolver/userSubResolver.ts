import { Login } from "../../../database/auth/login";
import { dataLoaders } from "../dataloaders";

export const userSubResolver = {
    role: async (parent: Login) => {
        if (parent.roleId === null || parent.roleId === undefined) return "";
        await dataLoaders.roleLoader.clear(parent.roleId);

        return dataLoaders.roleLoader.load(parent.roleId);
    },
};