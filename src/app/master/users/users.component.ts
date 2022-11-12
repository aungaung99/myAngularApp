import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Users } from 'src/app/model/users';
import { UsersService } from './users.service';
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  loading = true;
  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['id', 'name', 'username'];

  constructor(private user: UsersService, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit() {
    this.user.getData().subscribe(data => {
      this.dataSource = new MatTableDataSource<Users>(data);
      this.loading = false;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort!: MatSort;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(sortState);
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
