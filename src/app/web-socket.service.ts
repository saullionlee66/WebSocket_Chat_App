import { Injectable } from '@angular/core';
import {ChatMessage} from './Models/chatMessage'
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  chatMsgs: ChatMessage[] = [];

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:3000/');

    this.webSocket.onopen = (e)=>{
      console.log("Open: ", e); 
    };

    this.webSocket.onmessage = e =>{
      //make the message a object, then push it into chatMegs
      const chatMsg = JSON.parse(e.data);
      // console.log("chatMsg",chatMsg);
      this.chatMsgs.push(chatMsg);
      // console.log("chatMsgs",this.chatMsgs);

      
    };

    this.webSocket.onclose = e =>{
      console.log("Close: ", e);
    }

  }

  public sendMessage(chatMsg:ChatMessage){
      this.webSocket.send(JSON.stringify(chatMsg));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }


}
