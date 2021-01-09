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
import { MatDialog } from '@angular/material/dialog';

import { ResultsModalData } from '@shared/models/results-modal-data.model';
import { ResultsModalComponent } from '@shared/components/results-modal/results-modal.component';

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
  end = false;
  correct = 0;
  percent = 100;

  currentItem?: Item;
  shuffledItems: Item[] = [];

  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onClickCard();
  }
  onClickCard(): void {
    this.cardService.card$.subscribe((card: Card) => {
      const cardStatus: CardStatus = this.validateCard(card);
      this.cardService.setUpdatedCardStatus(cardStatus);
      this.applyChanges();
    });
  }

  validateCard(card: Card): CardStatus {
    const status = card.status;
    const isValid = card.item.id === this.currentItem?.id;

    if (isValid) {
      this.correct += 1;
      this.setCurrentItem();
      status.resolved = true;
    } else {
      this.fails += 1;
      status.incorrect = true;
    }
    this.updatePercent();
    return status;
  }

  updatePercent(): void {
    this.percent = Math.round(
      (this.correct / (this.correct + this.fails)) * 100
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const items = changes.items;
    if (items.currentValue.length) {
      this.shuffleItems([...items.currentValue]);
      this.setCurrentItem();
      this.applyChanges();
    }
  }

  shuffleItems(items: Item[]): void {
    this.shuffledItems = items.sort(() => Math.random() - 0.5);
  }

  setCurrentItem(): void {
    this.currentItem = this.shuffledItems[this.correct];
    if (this.correct === this.items.length) {
      this.end = true;
    }
  }

  openModal(seconds: number): void {
    const data: ResultsModalData = {
      seconds,
      percent: this.percent,
    };
    this.dialog.open(ResultsModalComponent, {
      data,
      width: '350px',
      height: '500px',
    });
  }

  private applyChanges(): void {
    if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
