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
  @Input() updatedCard: Card | undefined;

  @Output() cardClicked = new EventEmitter<Card>();

  cardsRecord = new Map<number, Card>();
  cards: Card[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.setCards(changes.items.currentValue);
    }
    if (changes.updatedCard?.currentValue) {
      const updatedCard: Card = changes.updatedCard.currentValue;
      const index = this.cards.map(({ id }) => id).indexOf(updatedCard.id);
      this.cards[index] = updatedCard;
    }
  }

  ngOnInit(): void {}

  selectCard(card: Card): void {
    this.cardClicked.emit(card);
  }

  private setCards(items: Item[]): void {
    items.forEach(({ id, name, photoUrl }) => {
      const card: Card = {
        id,
        item: {
          name,
          photoUrl,
        },
        status: {
          failed: false,
          resolved: false,
        },
      };
      this.cards.push(card);
    });
  }
}
