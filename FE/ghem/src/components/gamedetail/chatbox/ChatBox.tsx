import { css } from '@emotion/react'
import React, { useEffect, useState, useRef } from 'react'

import Header from './header/Header'
import Body from './body/Body'
import Footer from './footer/Footer'

import { dummyMessages } from './dummyMessages'
import { MessageType } from './body/MessageType'
import { Client } from '@stomp/stompjs'

const STOMP_CONFIG = {
  debug: (str: string) => {
    console.log(str);
  },
  reconnectDelay: 1000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
}

type ChatBoxProps = {
  brokerUrl: string
}

function ChatBox({brokerUrl}: ChatBoxProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef(new Client(STOMP_CONFIG));
  const [isConnected, setIsConnected] = useState(false);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }

  const connetToBroker = () => {
    const client = clientRef.current;
    client.activate();
  }

  const disconnectToBroker = () => {
    const client = clientRef.current;
    client.deactivate();
  }

  useEffect(() => {
    const client = clientRef.current;
    client.brokerURL = brokerUrl;
    client.onConnect = (frame) => {
      console.log("연결 성공!");
      setIsConnected(true);
    }
    client.onWebSocketClose = () => {
      console.log("웹소켓 연결 끊김...");
      setIsConnected(false);
    }
    client.onDisconnect = () => {
      console.log("연결 해제...");
      setIsConnected(false);
    }
    client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
      setIsConnected(false);
    }
    connetToBroker();

    return () => {client.deactivate()}
  }, [])
  
  return (
    <div css={container}>
      <Header />
      <Body messages={messages} bodyRef={bodyRef}/>
      <Footer setMessages={setMessages} scrollToBottom={scrollToBottom} isConnected={isConnected} />
    </div>
  )
}

const container = css`
  position: sticky;
  top: 30px;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default ChatBox