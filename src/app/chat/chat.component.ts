import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms'
import {WebSocketService} from '../web-socket.service'
import {ChatMessage} from '../Models/chatMessage'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {

  constructor(public webSocketService:WebSocketService) { } 
 
  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  sendMsg(sendForm:NgForm){
    const chatMessage = new ChatMessage(sendForm.value.user,sendForm.value.msg);
    this.webSocketService.sendMessage(chatMessage);
    // console.log("User: ",this.webSocketService.chatMsgs);
    // console.log("Message: ",chatMessage.msg);
    sendForm.controls.msg.reset();

  }

  ngOnDestroy():void{
    this.webSocketService.closeWebSocket();
  }

}
