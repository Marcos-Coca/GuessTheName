import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

import { Card } from '@game/models/card.model';
import { Item } from '@game/models/item.model';
import { CardService } from '@game/services/card.service';
import { CardStatus } from '@game/models/card-status.model';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlComponent implements OnInit, OnChanges {
  @Input() items: Item[] = [];

  shuffledItems: Item[] = [];
  fails = 0;
  correct = 0;
  totalFails = 0;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.onClickCard();
  }

  onClickCard(): void {
    this.cardService.card$.subscribe((card: Card) => {
      const cardStatus: CardStatus = this.validateCard(card);
      this.cardService.setUpdatedCardStatus(cardStatus);
    });
  }

  validateCard(card: Card): CardStatus {
    const status = card.status;
    const isValid = card.item.id === this.shuffledItems[this.correct].id;

    if (isValid) {
      this.fails = 0;
      this.correct += 1;
      return { ...status, resolved: true };
    }

    if (this.fails >= 3) {
      this.fails += 1;
      this.totalFails += 1;
      return { ...status, failed: true };
    }

    return { ...status, incorrect: true };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.items = changes.items?.currentValue;
    this.shuffleItems([...this.items]);
  }

  shuffleItems(items: Item[]): void {
    this.shuffledItems = items.sort(() => Math.random() - 0.5);
    console.log(this.shuffledItems);
  }
}
