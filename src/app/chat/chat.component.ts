import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  connection;
  message;

  //new test
  chats = [];

  constructor(private chatService: ChatService, private socketService: SocketService) { 
    this.getChats();
  }

  sendMessage(){
    const msg = {
      text: this.message
    }
    this.socketService.emit('send-message', msg);
    this.message ='';
  }

  getChats(){
    this.chatService.getChats()
        .subscribe(res => this.chats = res);
  }

  ngOnInit() {
    //this.connection =this.chatService.getMessages().subscribe(message => this.messages.push(message));
    this.messages = new Array();
    this.socketService.on('message-received', (data) => {
      this.messages.push(data);
      console.log(data);
      console.log(this.messages);
    });
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }
}
