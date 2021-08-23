import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [BrowserModule, BrowserAnimationsModule],
  providers: [LocalStorageService, AuthService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import CoreModule only in AppModule.'
      );
    }
  }
}
