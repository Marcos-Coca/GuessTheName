import {
  Directive,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  SimpleChanges,
  Renderer2,
} from '@angular/core';

import { CardStatus } from '@game/models/card-status.model';

@Directive({
  selector: '[appBackground]',
})
export class BackgroundDirective implements OnInit, OnChanges {
  @Input('appBackground') status!: CardStatus;

  constructor(private elementRef: ElementRef, private rerender: Renderer2) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.status.failed) {
      this.setBgColor('red');
    }
    if (this.status.resolved) {
      this.setBgColor('green');
    }
  }

  ngOnInit(): void {}

  setBgColor(color: string): void {
    console.log(color);
    this.rerender.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    );
  }
}
