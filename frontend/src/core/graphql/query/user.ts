import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      name
      email
      updatedAt
    }
  }
`;

export const GET_ONE_USER = gql`
  query getOneUser($id: Float!) {
    getOneUser(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_USER = gql`
  query getUser($search: String!) {
    getUser(search: $search) {
      id
      name
      email
    }
  }
`;
