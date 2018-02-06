import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

 
  connection;
  message;

  //new test
  newChatMessage = {
    message : "",
    sender : "Test",
    receiver : "Samson",
    date : new Date()
  };
  chats = [];

  constructor(private chatService: ChatService, private socketService: SocketService) { 
    this.getChats();
  }


  sendMessage(){
    this.newChatMessage.message = this.message;
    this.chatService.saveChat(this.newChatMessage).subscribe((result) => {
      this.socketService.emit('send-message', this.newChatMessage);
      this.message = '';
    })   
  }

  /*
     sendMessage(){
    const msg = {
      text: this.message
    }
    this.socketService.emit('send-message', msg);
    this.message ='';
  }
  */

  getChats(){
    this.chatService.getAllChats()
        .subscribe(res => this.chats = res);
  }

  ngOnInit() {
    //this.connection =this.chatService.getMessages().subscribe(message => this.messages.push(message));
    this.chats = new Array();
    this.socketService.on('message-received', (data) => {
      this.chats.push(data);
    });
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }
}
