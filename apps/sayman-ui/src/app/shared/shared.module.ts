import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { CardViewComponent } from './card-view/card-view.component';

@NgModule({
  declarations: [ContainerComponent, CardViewComponent],
  imports: [CommonModule],
  exports: [CommonModule, ContainerComponent, CardViewComponent],
})
export class SharedModule {}
