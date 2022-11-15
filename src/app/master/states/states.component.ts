import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from "../../model/comment";
import { CommentService } from 'src/app/api/comment.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  comments: Comment[] = [];

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private commentService: CommentService, private http: HttpClient) { }

  someClickHandler(info: any): void {
    console.log(info);
  }

  ngOnInit(): void {

    this.dtOptions = {

      data: this.comments,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        console.log(row);
        const self = this;

        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });

        return row;
      }
    }
    this.commentService.getData().subscribe(data => {
      this.comments = data;
      this.dtTrigger.next(data);
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
