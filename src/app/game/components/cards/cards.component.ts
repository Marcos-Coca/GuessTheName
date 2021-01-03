import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { Card } from '@game/models/card.model';
import { Item } from '@game/models/item.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit, OnChanges {
  @Input() items: Item[] = [];

  cards: Card[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setCards(changes.items.currentValue);
  }

  ngOnInit(): void {}

  private setCards(items: Item[]): void {
    this.cards = items.map((item) => ({
      item,
      status: {
        failed: false,
        resolved: false,
        incorrect: false,
      },
    }));
  }
}
