import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }

  getData(): Observable<any> {
    let url = "https://jsonplaceholder.typicode.com/users";
    return this.http.get(url);
  }
}
