import { queryResolvers } from "./resolvers/query";
import { mutationResolvers } from "./mutations";
import { userSubResolver } from "./resolvers/subResolver/userSubResolver";
import { recordingSubResolver } from "./resolvers/subResolver/recodingSubResolver";
import { patientSubResolver } from "./resolvers/subResolver/patientSubResolver";
export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    User: userSubResolver,
    Recording: recordingSubResolver,
    Patient:patientSubResolver
};
