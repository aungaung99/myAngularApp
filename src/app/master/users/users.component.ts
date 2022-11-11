import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { UsersService } from './users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading = true;
  constructor(private user: UsersService) {

  }

  displayedColumns: string[] = ['id', 'name', 'username'];
  user_data: Users[] = [];
  ngOnInit(): void {
    this.user.getData().subscribe(data => {
      this.user_data = data;
      this.loading = false;
      console.log(this.user_data);
    });
  }

}
