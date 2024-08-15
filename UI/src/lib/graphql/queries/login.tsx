// login.tsx

import { gql } from "@apollo/client";

export const LOGIN_API = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      info {
        email
        id
      }
      token {
        token
      }
    }
  }
`;
