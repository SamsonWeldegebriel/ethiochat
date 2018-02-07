import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UserService } from '../app/services/user.service';
import { ChatComponent } from './chat/chat.component'
import { ChatService } from './services/chat.service';

import {FormsModule} from '@angular/forms'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SocketService } from './services/socket.service';
import { GroupchatComponent } from './groupchat/groupchat.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: ChatComponent},
  { path: 'groupchat', component: GroupchatComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    GroupchatComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, ChatService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
