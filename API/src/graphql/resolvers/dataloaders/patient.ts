import { Patient } from "../../../database/patient/patient";

// create function for get patient by ids
export const getPatient = async (ids: readonly string[]): Promise<Patient[]> => {
    const PatientMap: Map<string, Patient> = new Map();
    const _ids = ids.map((id) => `${id}`);
    (await Patient.findByIds(_ids)).forEach((f) => PatientMap.set(f.id, f));
    const Patients = ids.map((id) => PatientMap.get(id)).filter((patient):
    patient is Patient => patient !== undefined);

    return Patients;
  };
  