import { Avatar } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase.config";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const recipientEmail = getRecipientEmail(users, user);

  const userCollectionRef = collection(db, "user");

  const recipientCollRef = query(
    userCollectionRef,
    where("email", "==", recipientEmail)
  );

  const [recipientSnapshot] = useCollection(recipientCollRef);

  const recipient = recipientSnapshot?.docs?.map((doc) => doc.data());

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      <UserAvatar src={recipient?.[0]?.photoURL} />
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
