import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import express from 'express';
import * as url from 'url';
import * as path from 'path';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const max_auction_time = 360000;
const bet_timing = 120000;

export const data = {
  participants: [],
  current_participant_id: null,
  auction_time_start: null,
  auction_time_end: null,
  bet_timing,
};

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

server.listen(process.env.APP_PORT || 5000, () => {
  console.log('Server started on port 5000');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'www', 'index.html'))
});


wss.on('connection', (ws, req) => {
  data.current_time = dayjs.utc().valueOf();
  broadcastAuction(data, 'connection');

  ws.on('message', (message) => {
    const auction = JSON.parse(message);

    switch (auction.event) {
      case 'auction_add_participant':
        const newUser = {
          id: data.participants.length,
          user_name: auction.user_name,
          time_start: null,
          time_end: null,
        };
        data.participants.push(newUser);
        console.log(auction.user_name);
        broadcastAuction(newUser, 'auction_add_participant');
        break;
      case 'auction_start':
        data.auction_time_start = dayjs.utc().valueOf();

        data.auction_time_end = dayjs(dayjs.utc().valueOf()).add(6, 'minute').valueOf();

        data.current_time = dayjs.utc().valueOf();

        makeMove();
        broadcastAuction(data, 'auction_start');

        const changeCurrentParticipantIdTimer = setInterval(() => {
          makeMove();
          broadcastAuction(data, 'auction_start');
        }, bet_timing);

        setTimeout(() => {
          clearInterval(changeCurrentParticipantIdTimer);
          data.auction_time_start = null;
          data.auction_time_end = null;
          data.current_participant_id = null;
          data.participants.forEach(el => {
            el.time_start = null;
            el.time_end = null;
          });
          broadcastAuction(data, 'auction_start');
          console.log('end');
        }, max_auction_time);
    }
  });
});

const broadcastAuction = (auction, event_type) => {
  console.log(auction);
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ ...auction, event_type: event_type }));
  });
};

const makeMove = () => {
  const last_participant_id = data.participants[data.participants.length - 1]?.id;
  const isLastBuyer = data.current_participant_id === last_participant_id;

  if (isLastBuyer) {
    console.log('last');
    data.current_participant_id = data.participants[0].id;
  } else if (data.current_participant_id === null) {
    data.current_participant_id = data.participants[0].id;
  } else {
    data.current_participant_id += 1;
  };

  data.participants.forEach(el => {
    el.time_start = null;
    el.time_end = null;
  });

  const currentParticipantIndex = data.participants.findIndex(item => item.id === data.current_participant_id);

  data.participants[currentParticipantIndex].time_start = dayjs.utc().valueOf();
  data.participants[currentParticipantIndex].time_end = dayjs.utc().valueOf() + bet_timing;

  data.current_time = dayjs.utc().valueOf();
};
