// login.tsx

import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
query GetUserProfile {
    getUserProfile {
      id
      email
      isActive
      fullName
      gender
      countryCode
      role {
        id
        roleName
        roleConstraint
      }
    }
  }
`;
