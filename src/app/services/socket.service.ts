import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

//import io from 'socket.io-client';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket = io('http://localhost:3000');

  constructor() { }

  on(eventName: any, callback:any){
    if(this.socket){
      this.socket.on(eventName, function(data: any){
        callback(data);
      });
    }
  };

  emit(eventName, data){
    if(this.socket){
      this.socket.emit(eventName, data);
    }
  };

  removeListener(eventName){
    if(this.socket){
      this.socket.removeListener(eventName);
    }
  };

   // sendMessage(message){
  //   this.socket.emit('add-message', message)
  // }

  // sendMessage(){
  //   const message = {
      
  //   }
  //   this.socket.emit('add-message', message)
  // }

  // getMessages(){
  //   let observable = new Observable(observer => {
  //     //this.socket = io(this.url);
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => this.socket.disconnect();
  //   })

  //   return observable;
  // }

}
