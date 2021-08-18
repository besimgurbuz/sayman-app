import { InjectionToken } from '@angular/core';

const BASE_URL_TOKEN = new InjectionToken<string>('Base URL of any api call');

export default BASE_URL_TOKEN;
