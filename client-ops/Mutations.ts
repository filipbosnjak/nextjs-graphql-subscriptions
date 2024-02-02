import {gql} from "@apollo/client";

export const SendMessage = gql`
  mutation SendMessage ($message:String!){sendMessage(message:$message)}
`;
