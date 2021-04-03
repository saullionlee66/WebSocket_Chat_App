const WebSocket = require('ws') ;
const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', webSocketClient =>{
    // webSocketClient.send('{"Connection":"OK"}');

    webSocketClient.on('message', message=>{
        webSocketServer.clients.forEach(
            client =>{
                client.send(message);
            }
        )
    })

    webSocketClient.on('error', error=>{
        console.log("Error: ", error);
    })

    webSocketClient.on('close', ws=>{
        onclose();
    })
})

server.listen(PORT, ()=>{
    console.log(`WebSocket server started on port `+ PORT);
})



