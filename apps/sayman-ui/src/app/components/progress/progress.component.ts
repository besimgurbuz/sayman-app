import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PROGRESS_SUBJECT } from '../../tokens';

@Component({
  selector: 'sayman-app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  progress$: Observable<boolean>;

  constructor(@Inject(PROGRESS_SUBJECT) progressSubject: Subject<boolean>) {
    this.progress$ = progressSubject.asObservable();
  }

  ngOnInit(): void {}
}
