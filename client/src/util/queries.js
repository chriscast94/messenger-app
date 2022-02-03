import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query {
    users {
      id
      userName
      email
      messages {
        messText
        messSender
        messReceiver
      }
    }
  }
`;

export const MESSAGES_QUERY = gql`
query {
    messages {
      id
      messText
      messSender
      messReceiver
      messTime
      users {
        userName
        email
      }
    }
  }
`;
