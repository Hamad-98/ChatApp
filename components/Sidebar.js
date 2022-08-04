import { Avatar, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase.config";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const chatCollectionRef = collection(db, "chat");
  const [chatsSnapshot, loading, error] = useCollection(chatCollectionRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const createChat = async () => {
    const input = prompt("Please enter a email address");

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExits(input) &&
      input !== user.email
    ) {
      // We need to add the chat into db 'chats' collection
      addDoc(chatCollectionRef, {
        users: [user.email, input],
      });
    } else {
      alert("Chat with user already exists");
    }
  };

  const chatAlreadyExits = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chat" />
      </Search>
      <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat users={chat.data().users} key={chat.id} id={chat.id} />
      ))}
    </Container>
  );
};

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SideBarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

export default Sidebar;
