import { Patient } from "../../../database/patient/patient";
import { PatientInput } from "../../../types/user";
import { GraphQLContext } from "../../utility/graphql";

// create  Patient
export const createPatient = async (
  _: null,
  { input }: { input: PatientInput },
  { userId }: GraphQLContext
) => {
  let patient;
  const {id,...rest} =input
  if (input.id) {
      // Update the existing patient details
      patient = await Patient.createQueryBuilder()
        .update()
        .set({ ...rest, userId })
        .where({ id})
        .output("*")
        .execute()
        .then((response) => {
          if (!Array.isArray(response.raw) || response.raw.length === 0) {
            throw new Error("Failed to update patient details");
          }
          return response.raw[0];
        });
       } else {
    // Insert new patient details
    patient = await Patient.createQueryBuilder()
      .insert()
      .values({ ...input, userId })
      .output("*")
      .execute()
      .then((response) => {
        if (!Array.isArray(response.raw) || response.raw.length === 0) {
          throw new Error("Failed to save patient details");
        }
        return response.raw[0];
      });
  }
  return patient;
};