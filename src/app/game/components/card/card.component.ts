import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';

import { Card } from '@game/models/card.model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card!: Card;

  @Output() cardClicked = new EventEmitter<Card>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
    }
    console.log(changes);
  }

  ngOnInit(): void {}

  selectCard(): void {
    this.cardClicked.emit(this.card);
  }
}
