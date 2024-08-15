import { gql } from "@apollo/client";

export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput) {
    createPatient(input: $input) {
      id
      fullName
      date
      gender
      phoneNumber
      address
      streetAddress
      city
      state
      zipcode
      createdAt
      UpdatedAt
    }
  }
`;

export const GET_PATIENT_BY_NUMBER = gql`
  query GetPatientByPhoneNumber($phoneNumber: String) {
    getPatientByPhoneNumber(phoneNumber: $phoneNumber) {
      id
      fullName
      date
      gender
      phoneNumber
      address
      streetAddress
      city
      state
      zipcode
    }
  }
`;
