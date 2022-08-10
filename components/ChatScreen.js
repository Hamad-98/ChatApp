import AttachFile from "@mui/icons-material/AttachFile";
import MoreVert from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase.config";
import { IconButton } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
  addDoc,
  where,
} from "firebase/firestore";
import { Message } from "./Message";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import Mic from "@mui/icons-material/Mic";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

export const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const messagesCollRef = collection(db, "chat", router.query.id, "messages");
  const messaqesQuery = query(messagesCollRef, orderBy("timestamp", "asc"));
  const [messagesSnapshot] = useCollection(messaqesQuery);
  const reciepientEmail = getRecipientEmail(chat.users, user);
  const userCollectionRef = collection(db, "user");
  const recipientCollRef = query(
    userCollectionRef,
    where("email", "==", reciepientEmail)
  );
  const [recipientSnapshot] = useCollection(recipientCollRef);

  const endOfMessagesRef = useRef(null);

  const recipient = recipientSnapshot?.docs?.map((doc) => doc.data());

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((msg) => (
        <Message
          key={msg.id}
          user={msg.data().user}
          message={{
            ...msg.data(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((msg) => {
        <Message key={msg.id} user={msg.user} message={msg} />;
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const userRef = doc(db, "user", user.uid);

    setDoc(
      userRef,
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    const chatRef = collection(db, "chat", router.query.id, "messages");

    addDoc(
      chatRef,
      {
        timestamp: Date().toLocaleString(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      },
      { merge: true }
    );

    setInput("");
    scrollToBottom();
  };
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.[0]?.photoURL} />
        ) : (
          <Avatar src={reciepientEmail[0]} />
        )}
        <HeaderInformation>
          <h3>{reciepientEmail}</h3>

          {recipientSnapshot ? (
            <p>
              Last active:
              {recipient?.[0]?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.[0]?.lastSeen.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active..</p>
          )}
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>{showMessages()}</MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  );
};

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: whitesmoke;
`;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const EndOfMessage = styled.div``;

const HeaderIcons = styled.div``;
