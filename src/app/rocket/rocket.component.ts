import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.sass'],
  animations: [
    trigger('flyIn', [
      state('in', style({ top: '100%', opacity: 1 })),
      transition('void => *', [
        group([
          animate('5s ease', style({ top: '-30%' })),
          animate('5s 1s ease', style({ opacity: 0 })),
        ])
      ])
    ])
  ]
})
export class RocketComponent implements OnInit {
  state: any;
  @Input() open = false;
  @Input() name = '';

  constructor() { }

  ngOnInit(): void {
  }

}
