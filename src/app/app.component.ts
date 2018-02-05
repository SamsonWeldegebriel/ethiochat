import { Component } from '@angular/core';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ethio-Syrian Chat System';

  users = [];
  constructor(private userService: UserService){
    this.userService .getUsers()
      .subscribe(res => this.users = res);
  }
  

  username: string = '';
  nameDisplay: string = '';
  showSpinner: boolean = false;

  showName() {
    this.showSpinner = true;

    setTimeout(() => {
      this.nameDisplay = this.username;
      this.showSpinner = false;
    }, 2000);
  }
}
