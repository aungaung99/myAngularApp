import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Users } from 'src/app/model/users';
import { UsersService } from './users.service';
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {

  loading = true;
  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['select', 'id', 'name', 'username'];
  selection = new SelectionModel<Users>(true, []);
  constructor(
    private user: UsersService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.user.getData().subscribe(data => {
      this.dataSource = new MatTableDataSource<Users>(data);
      this.loading = false;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.selection.clear() ?
      this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(UserDialogComponent, {
      width: '20%',
      enterAnimationDuration: enterAnimationDuration,
      exitAnimationDuration: exitAnimationDuration
    });
  }

}
