import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css']
})
export class GroupchatComponent implements OnInit {

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
  groups = [];
 
  filteredChats = [];

  constructor(private chatService: ChatService, private socketService: SocketService, private userService: UserService) { 
    this.getChats();
    this.userService .getUsers()
      .subscribe(res => this.groups = res);
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
