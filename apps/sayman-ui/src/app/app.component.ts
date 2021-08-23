import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PROGRESS_SUBJECT } from './tokens';

@Component({
  selector: 'sayman-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  progressSubject: Subject<boolean>;
  routeChangeSubs: Subscription;

  constructor(
    @Inject(PROGRESS_SUBJECT) progressSubject: Subject<boolean>,
    private router: Router
  ) {
    this.progressSubject = progressSubject;
  }

  ngOnInit(): void {
    this.routeChangeSubs = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        ),
        map((event) => (event instanceof NavigationStart ? true : false))
      )
      .subscribe((isNavigating) => this.progressSubject.next(isNavigating));
  }

  ngOnDestroy(): void {
    this.progressSubject.complete();
    this.routeChangeSubs.unsubscribe();
  }
}
