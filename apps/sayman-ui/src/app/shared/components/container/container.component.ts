import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sayman-app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContainerComponent implements OnInit {
  @Input() justifyContent:
    | 'start'
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start' = 'center';

  @Input() height: number | string = 'fit-content';

  constructor() {}

  ngOnInit(): void {}

  _styles() {
    return {
      'justify-content': this.justifyContent,
      height:
        typeof this.height === 'number' ? `${this.height}px` : this.height,
    };
  }
}
