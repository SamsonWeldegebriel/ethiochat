import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

 
  connection;
  message;

  //new chat message object
  newChatMessage = {
    message : "",
    sender : "",
    receiver : "",
    date : new Date(),
    status: false
  };
  chats = [];
  users = [];
 
  filteredChats = [];

  constructor(private chatService: ChatService, private socketService: SocketService, private userService: UserService) { 
    //this.getChats();
    this.userService .getUsers()
      .subscribe(res => this.users = res);
  }


  sendMessage(){
    this.newChatMessage.message = this.message;
    this.newChatMessage.sender = this.loggedInMemberUsername;
    this.newChatMessage.receiver = this.receiverName;
    this.chatService.saveChat(this.newChatMessage).subscribe((result) => {
      this.socketService.emit('send-message', this.newChatMessage);
      this.message = '';
    })   
  }

  saveStatus(){
    this.newChatMessage.message = this.message;
    this.newChatMessage.sender = this.loggedInMemberUsername;
    this.newChatMessage.receiver = this.receiverName;
    this.newChatMessage.status = true;
    this.chatService.saveChat(this.newChatMessage).subscribe((result) => {
      this.socketService.emit('send-message', this.newChatMessage);
      this.message = '';
      this.newChatMessage.status= false;
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

  getChatsByLoggedInUser(loginName){
    this.chatService.getChatByUser(this.loggedInMemberUsername)
        .subscribe(res => this.chats = res);
  }

  ngOnInit() {
    //this.connection =this.chatService.getMessages().subscribe(message => this.messages.push(message));
    this.chats = new Array();
    this.filteredChats = new Array();
    this.socketService.on('message-received', (data) => {
      this.chats.push(data);
      this.filteredChats = this.filterChat(this.chats);
    });
  }

  ngOnDestroy(){
   // this.connection.unsubscribe();
  }


  
  username: string = '';
  loggedInMemberUsername: string = '';
  
  showSpinner: boolean = false;

  showName() {
    this.showSpinner = true;

    setTimeout(() => {
      this.loggedInMemberUsername = this.username;      
      this.getChatsByLoggedInUser(this.loggedInMemberUsername);
      this.showSpinner = false;
    }, 2000);
  }

  chatOpenned: boolean = false;
  receiverName: string ='';
  loggedInMember: {};
  openChat(selectedMember){
    this.saveStatus();
    this.chatOpenned = true;
    this.loggedInMember = selectedMember;
    this.receiverName = selectedMember.username;
    this.filteredChats = //this.chats.filter(e => e.sender == this.receiverName ||  e.receiver == this.receiverName)//
    this.filterChat(this.chats);
    //console.log('filteres ', this.filteredChats);
  }

  filterChat(data){
    return data.filter(e => e.sender == this.receiverName ||  e.receiver == this.receiverName)
  }

}
