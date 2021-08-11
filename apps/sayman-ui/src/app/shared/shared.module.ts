import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule],
  exports: [CommonModule, ContainerComponent],
})
export class SharedModule {}
