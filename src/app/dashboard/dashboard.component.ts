import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/master/users/users.service';

export interface Users {
  id: number,
  name: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: Users[] = [
    { id: 1, name: 'Hello' },
    { id: 2, name: 'Hllo 2' }
  ];
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Users>();
  constructor(private user: UsersService, private _liveAnnouncer: LiveAnnouncer) { }
  @ViewChild(MatSort) sort!: MatSort;
  async ngOnInit() {
    this.user.getData().subscribe(data => {
      //this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    });
  }

  async ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
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
