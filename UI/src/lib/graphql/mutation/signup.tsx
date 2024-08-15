import { gql } from "@apollo/client";

export const SIGNUP_API = gql`
 mutation Mutation($input: CreateUserInput!) {
  signUpUser(input: $input) {
     token {
       token
     }
     info {
       email
       id
     }
  }
}
`;
