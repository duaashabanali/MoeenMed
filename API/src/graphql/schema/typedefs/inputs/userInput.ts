export const userInput = `
input CreateUserInput {
    email:String,
    password: String,
    fullName : String,
    phoneNumber: String,
    countryCode: String,
    gender: Gender,
} 

input PatientInput {
 id:String,
    fullName:String,
    date:String,
    gender:String,
    phoneNumber:String,
    address:String,
    streetAddress:String,
    city:String,
    state:String,
    zipcode:String,

}
`;
