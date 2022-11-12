import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Event, NavigationCancel, NavigationError, NavigationEnd, NavigationStart, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav
  title = 'myAngularApp';
  loading = false;
  opened = true;

  constructor(private router: Router,
    private observer: BreakpointObserver) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          // this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  stopLoading() {
    this.loading = false;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    }));
  }
}
