import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'sayman-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  routeChange$;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routeChange$ = this.router.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationStart || event instanceof NavigationEnd
      ),
      map((event) => (event instanceof NavigationStart ? true : false))
    );
  }
}
