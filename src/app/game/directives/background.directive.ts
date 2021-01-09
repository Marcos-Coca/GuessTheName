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
  @Input('appBackground') status?: CardStatus;

  @Input() defaultColor = 'white';

  constructor(private elementRef: ElementRef, private rerender: Renderer2) {}
  ngOnChanges(changes: SimpleChanges): void {
    const bgColor = this.selectBackground();
    this.setBgColor(bgColor);
  }

  ngOnInit(): void {}

  selectBackground(): string {
    if (this.status?.incorrect) {
      return 'red';
    }

    if (this.status?.resolved) {
      return 'green';
    }

    return this.defaultColor;
  }

  setBgColor(color: string): void {
    this.rerender.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    );
  }
}
