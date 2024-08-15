export const root = `
  # Query Definitions
  type Query {
    login(email: String!, password: String!): UserWithToken
    forgotPassword(email: String!):String
    changePassword(newPassword: String!,resetToken: String!):String 
    getRecording(search:String):RecordingConnection
    getRecordingById(id:String):Recording
    getUserProfile:User
    getPatientByPhoneNumber(phoneNumber:String):Patient
    }
  
  # Mutation Definitions  
  type Mutation {
    signUpUser(input: CreateUserInput!): UserWithToken 
    createRecording(input:RecordingInput):Recording
    createPatient(input:PatientInput):Patient
  }

  # Scalar Definitions
  scalar DateTime
  scalar JSON
  scalar Upload
`;
