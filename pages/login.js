import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { db, provider, auth } from "../firebase.config";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";

const login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {})
      .catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <WhatsAppIcon style={{ width: "100px", height: "100px" }} />
        <Button onClick={signIn} variant="outlined">
          Sign in With Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
