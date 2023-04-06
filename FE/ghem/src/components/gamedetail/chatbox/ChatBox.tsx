import { css } from '@emotion/react'
import React, { useEffect, useState, useRef } from 'react'

import Header from './header/Header'
import Body from './body/Body'
import Footer from './footer/Footer'

import { dummyMessages } from './dummyMessages'
import { MessageType } from './body/MessageType'
import { Client } from '@stomp/stompjs'
import { mobile } from '@/util/Mixin'

const STOMP_CONFIG = {
  // debug: (str: string) => {
  //   console.log(str);
  // },
  reconnectDelay: 1000,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
}

type ChatBoxProps = {
  brokerUrl: string,
  appID: number,  // routing key로 생각할 것
  userID: number
}

function ChatBox({brokerUrl, appID, userID}: ChatBoxProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const clientRef = useRef<Client>(new Client(STOMP_CONFIG));
  const [isConnected, setIsConnected] = useState(false);

  const connetToBroker = () => {
    const client = clientRef.current;
    client.activate();
  }

  const disconnectToBroker = () => {
    const client = clientRef.current;
    client.deactivate();
  }

  const isMessageType = (obj: any): obj is MessageType => {
    return obj.userID !== undefined && obj.content !== undefined;
  }

  useEffect(() => {
    const client = clientRef.current;
    const destination = '/exchange/collector/' + appID;
    const queueConfig = {
      "auto-delete": "true",
      "durable": "false",
      "exclusive": "false",
    }
    client.brokerURL = brokerUrl;
    client.onConnect = (frame) => {
      client.subscribe(destination,
        (message) => {
          const newMsg = JSON.parse(message.body);
          if (isMessageType(newMsg)) {
            setMessages((oldState) => {
              return [...oldState, JSON.parse(message.body)]
            })
          } else {
            console.log("형식에 맞지 않는 메시지임:", newMsg);
          }
        }, queueConfig)
      setIsConnected(true);
      console.log("연결 성공");
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
      <Body messages={messages} userID={userID} />
      <Footer setMessages={setMessages} client={clientRef.current} appID={appID} userID={userID} isConnected={isConnected} />
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
  ${mobile} {
    position: static;
  }
`

export default ChatBox