import {gql} from "@apollo/client";

export const NewMessage = gql`
  subscription NewMessage {newMessage{body}}
`;
