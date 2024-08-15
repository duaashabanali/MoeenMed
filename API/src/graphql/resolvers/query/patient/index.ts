import { Patient } from "../../../../database/patient/patient";
import { GraphQLContext } from "../../../utility/graphql";

// get user profile
export const getPatientByPhoneNumber = async (
    _: any,
     {phoneNumber}:{phoneNumber:string},
     { userId }: GraphQLContext,
)=> {  
    const patient = await Patient.createQueryBuilder()
    .where({phoneNumber})
    .andWhere({userId})
    .getOne();
    return patient;
  };