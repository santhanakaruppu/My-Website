import { gql } from "@apollo/client";

const addUser = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const EditUser = gql`
  mutation EditUser(
    $id: ID!
    $name: String!
    $email: String!
    $password: String!
  ) {
    updateUser(id: $id, name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

export { addUser, deleteUser, EditUser };
