import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
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

export class AppComponent implements AfterViewInit, AfterContentChecked {
  @ViewChild(MatSidenav) sidenav!: MatSidenav
  @ViewChild(MatDrawer) drawer!: MatDrawer
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

          this.loading = false;

          const urlPath = window.location.pathname;
          let str = urlPath.split('/')[1].toString();
          switch (str) {
            case "master":
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
        this.opened = false;
        this.drawer.mode = "over";
        this.drawer.close();
      }
      else {
        this.opened = true;
        if (this.drawer.mode == "over") {
          this.drawer.mode = "side";
          this.drawer.open();
        }
      }
    }));
  }
  ngAfterContentChecked(): void {
    const urlPath = window.location.pathname;
    let str = urlPath.split('/')[1].toString();
    switch (str) {
      case "master":
        {
          this.masterToggleOpened = true;
          break;
        }
      default: {
        this.masterToggleOpened = false;
        break;
      }
    }
  }

}
