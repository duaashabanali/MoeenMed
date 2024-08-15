// login.tsx

import { gql } from "@apollo/client";

export const GET_RECORDING = gql`
query GetRecording($search: String) {
  getRecording(search: $search) {
    edges {
      node {
        id
        transcription
        summary
        soap
        patient {
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
          userId {
            id
            email
            isActive
            fullName
            gender
            countryCode
          }
          createdAt
          UpdatedAt
        }
        createdAt
        UpdatedAt
      }
      cursor
    }
  }
}
`;

export const GET_RECORDING_BY_ID = gql`
query GetRecordingById($getRecordingByIdId: String) {
  getRecordingById(id: $getRecordingByIdId) {
    id
    transcription
    summary
    soap
    patient {
      fullName
    }
  }
}
`;
