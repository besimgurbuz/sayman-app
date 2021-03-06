import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CardViewComponent } from './components/card-view/card-view.component';
import { ContainerComponent } from './components/container/container.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

@NgModule({
  declarations: [ContainerComponent, CardViewComponent, FormErrorComponent],
  imports: [CommonModule, MatProgressBarModule, MatFormFieldModule],
  exports: [
    CommonModule,
    ContainerComponent,
    CardViewComponent,
    FormErrorComponent,
  ],
})
export class SharedModule {}
