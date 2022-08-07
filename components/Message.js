import React from "react";
import styled from "styled-components";

export const Message = ({ user, message }) => {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

const Container = styled.div``;
