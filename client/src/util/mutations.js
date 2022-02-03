import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation(
  id
  userName
)
`;

export const DELETE_USER = gql`
  mutation($email: String!) {
    deleteUser(email: $email)
  }
`;

export const ADD_USER_SUB = gql`
  subscription {
    newUser {
      userName
      email
      id
      messages {
        messText
        messSender
        messReceiver
        messTime
      }
    }
  }
`;

export const DELETE_USER_SUB = gql`
  subscription {
    oldUser
  }
`;

export const CREATE_MESSAGES = gql`
mutation(
  $messText: String!
  $messSender: String!
  $messReceiver: String!
  $messTime: Float!
) {
  createMessage(
    messText: $message
    messSender: $senderText
    messReceiver: $receiverText
    messTime: $messTime
  ) {
    message
    messSender
    messReceiver
    id
    messTime
    users {
      userName
      email
    }
  }
}
`;

export const MESSAGES_SUB = gql`
  subscription($receiverMail: String!) {
    newMessage(receiverMail: $receiverMail) {
      message
      senderMail
      receiverMail
      id
      messTime
      users {
        username
        email
      }
    }
  }
`;
