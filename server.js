// server.js
import express from 'express';
import { AccessToken } from 'livekit-server-sdk';

const createToken = (room, identity) => {
    const roomName = room;
    const participantName = identity;

    const at = new AccessToken('api-key', 'secret-key', {
        identity: participantName,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return at.toJwt();
};

const app = express();
const port = 3000;

app.get('/handshake', (req, res) => {
    const room = req.query.room;
    const identity = req.query.identity;

    if (!room || !identity) {
        res.status(400).send('room and identity are required');
        return;
    }

    console.log(`creating token for ${identity} in room ${room}`);

    const token = createToken(room, identity);

    res.send({ token });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
