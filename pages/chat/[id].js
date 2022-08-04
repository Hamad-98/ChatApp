import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { ChatScreen } from "../../components/ChatScreen";
import { auth, db } from "../../firebase.config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  orderBy,
  query,
  collectionGroup,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

//context allow you to access url and props.
//this returns props, so the compoenent can use the props
export async function getServerSideProps(context) {
  const ref = doc(db, "chat", context.query.id);

  //PREP the messages on the server: 2:16:31
  const q = query(collection(ref, "messages"), orderBy("timestamp", "asc"));
  const docSnap = await getDocs(q);

  console.log(docSnap.docs);

  const messages = docSnap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: "hello",
    }));

  //PREP THE CHATS
  const messagesRef = await getDoc(ref);
  const chat = {
    id: messagesRef.id,
    ...messagesRef.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
