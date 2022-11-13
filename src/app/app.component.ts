import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Event, NavigationCancel, NavigationError, NavigationEnd, NavigationStart, Router, ActivatedRoute } from "@angular/router";

export interface MenuItem {
  label: string,
  url: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  title = 'myAngularApp';
  loading = false;
  opened = true;
  menuItems!: MenuItem[];
  masterToggleOpened = false;

  constructor(private router: Router, private activateRoute: ActivatedRoute,
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
          // setTimeout(() => {
          //   this.loading = false;
          // }, 1000);
          this.loading = false;

          const urlPath = window.location.pathname;

          switch (urlPath) {
            case "/master/states":
              {
                this.masterToggleOpened = true;
                break;
              }
            default: {
              this.masterToggleOpened = false;
              break;
            }
          }
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

    const urlPath = window.location.pathname;
    switch (urlPath) {
      case "/master/states":
        {
          this.masterToggleOpened = true;
          break;
        }
      default: {
        break;
      }
    }
  }
 
}
