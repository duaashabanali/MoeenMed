import { gql } from "@apollo/client";

export const CREATE_RECORDING = gql`
  mutation CreateRecording($input: RecordingInput) {
    createRecording(input: $input) {
      id
      transcription
      createdAt
      UpdatedAt
    }
  }
`;
