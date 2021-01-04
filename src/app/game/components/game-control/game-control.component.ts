import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
  ViewRef,
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

  fails = 0;
  correct = 0;
  totalFails = 0;

  currentItem?: Item;
  shuffledItems: Item[] = [];

  minutes = 0;
  seconds = 0;

  constructor(
    private cardService: CardService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onClickCard();
  }

  startTimer(): void {}

  onClickCard(): void {
    this.cardService.card$.subscribe((card: Card) => {
      const cardStatus: CardStatus = this.validateCard(card);
      this.cardService.setUpdatedCardStatus(cardStatus);
    });
  }

  validateCard(card: Card): CardStatus {
    const status = card.status;
    const isValid = card.item.id === this.currentItem?.id;

    if (isValid) {
      this.fails = 0;
      this.correct += 1;
      this.setCurrentItem();
      status.resolved = true;
    } else if (this.fails >= 3) {
      this.fails += 1;
      this.totalFails += 1;
      status.failed = true;
    } else {
      this.fails += 1;
      status.incorrect = true;
    }
    return status;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.items = changes.items?.currentValue;
    this.shuffleItems([...this.items]);
    this.setCurrentItem();
  }

  shuffleItems(items: Item[]): void {
    this.shuffledItems = items.sort(() => Math.random() - 0.5);
  }

  setCurrentItem(): void {
    this.currentItem = this.shuffledItems[this.correct];
    this.applyChanges();
  }

  private applyChanges(): void {
    if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
