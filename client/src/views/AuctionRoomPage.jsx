import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
dayjs.extend(utc);

const AuctionRoomPage = () => {
  const [participants, setParticipants] = useState([]);
  const [currentParticipantId, setCurrentParticipantId] = useState(null);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const socket = useRef();

  useEffect(() => {
    try {
      const urlAuctionWs = `ws://auction.na4u.ru:80`;
      // const urlAuctionWs = `ws://${import.meta.env.APP_IP || 'localhost'}:${import.meta.env.APP_PORT || 5000}`;

      socket.current = new WebSocket(urlAuctionWs);

      socket.current.onopen = (e, r) => {
        setSocketConnected(true);
      };

      socket.current.onmessage = (event) => {
        const res = JSON.parse(event.data);
        console.log(event);

        window.currentTimeOnServer = res.current_time;

        window.timeDiff = res.current_time - dayjs().valueOf();
       
        switch (res.event_type) {
          case 'connection':
            console.log(res);
            if (res?.participants.length > 0) {
              setParticipants([...res.participants]);
            };

            setCurrentParticipantId(res.current_participant_id);

            if (res.auction_time_start !== null) {
              setAuctionStarted(true);
            };
            break
          case 'auction_add_participant':
            setParticipants((prev) => [...prev, res]);
            break;
          case 'auction_start':
            setParticipants(res.participants);
            setCurrentParticipantId(res.current_participant_id);

            if (res.current_participant_id !== null) {
              setAuctionStarted(true);
            } else {
              setAuctionStarted(false);
            };
          default:
            break;
        }
      };

      socket.current.onclose = () => {
        setSocketConnected(false);
        console.log("Socket connection closed");
      };

      socket.current.onerror = () => {
        console.log("Socket error");
      };
    } catch (error) {
      console.log(error);
    };
  }, []);


  const handleAddParticipant = (participant) => {
    const message = {
      event: 'auction_add_participant',
      user_name: participant
    };

    socket.current.send(JSON.stringify(message));
  };

  const handleStartAuction = () => {
    const message = {
      event: 'auction_start'
    };

    socket.current.send(JSON.stringify(message));
  };


  return (
    <>
      {auctionStarted ?
        <Table
          participants={participants} currentParticipantId={currentParticipantId}
        />
        :
        <Modal
          participants={participants} handleAddParticipant={handleAddParticipant}
          handleStartAuction={handleStartAuction}
        />
      }
    </>
  )
};

export default AuctionRoomPage;