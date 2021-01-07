import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Card } from '@game/models/card.model';
import { Item } from '@game/models/item.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnChanges {
  @Input() items: Item[] = [];

  cards: Card[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setCards(changes.items.currentValue);
  }

  private setCards(items: Item[]): void {
    this.cards = items.map((item) => ({
      item,
      status: {
        resolved: false,
        incorrect: false,
      },
    }));
  }
}
