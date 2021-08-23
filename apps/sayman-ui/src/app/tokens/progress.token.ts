import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

const PROGRESS_SUBJECT = new InjectionToken<Subject<boolean>>(
  'Progress observable across application'
);

export default PROGRESS_SUBJECT;
