import { gql } from "@apollo/client";

const getUsers = gql`
  query getUsers {
    users {
      id
      name
      email
      password
    }
  }
`;

const getUser = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      password
    }
  }
`;

export { getUsers, getUser };
