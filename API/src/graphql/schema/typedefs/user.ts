export const User = `
type User {
    id: String
    email: String
    isActive: Boolean
    fullName: String
    gender : String
    countryCode : String
    role : Role
}
type UserWithToken {
    token: Token
    info: User
}
type Token{
    token:String
} 

type Role {
    id:String
    roleName:String
    roleConstraint:String
  
}

type Patient {
    id: String,
    fullName:String,
    date:String,
    gender:String,
    phoneNumber:String,
    address:String,
    streetAddress:String,
    city:String,
    state:String,
    zipcode:String,
    userId: User,
    createdAt: DateTime,
    UpdatedAt: DateTime,
}
 
`;
