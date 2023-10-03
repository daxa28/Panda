import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createUser: CreateUserInput!) {
    createUser(createUser: $createUser) {
      id
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: Float!) {
    removeUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation createUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser) {
      id
    }
  }
`;
