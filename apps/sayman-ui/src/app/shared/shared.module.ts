import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { CardViewComponent } from './card-view/card-view.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ContainerComponent, CardViewComponent, FormErrorComponent],
  imports: [CommonModule, MatFormFieldModule],
  exports: [
    CommonModule,
    ContainerComponent,
    CardViewComponent,
    FormErrorComponent,
  ],
})
export class SharedModule {}
