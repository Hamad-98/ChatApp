import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase.config";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      <UserAvatar />
      <p>{recipientEmail}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

export default Chat;
