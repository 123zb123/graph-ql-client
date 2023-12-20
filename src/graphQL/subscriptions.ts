import { gql } from "@apollo/client";

export const USER_CREATED = gql`
  subscription {
    userCreated {
      username
    }
  }
`;
export const USER_LOGIN = gql`
  subscription userLogin {
    userLogin {
      status
      token
    }
  }
`;
