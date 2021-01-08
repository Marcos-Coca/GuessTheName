import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
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
export class GameControlComponent implements OnInit, OnChanges, OnDestroy {
  @Input() items: Item[] = [];

  fails = 0;
  correct = 0;

  currentItem?: Item;
  shuffledItems: Item[] = [];

  seconds = 0;
  timer: any;

  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onClickCard();
    this.startTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.seconds += 1;
      this.applyChanges();
    }, 1000);
  }

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
      this.correct += 1;
      this.setCurrentItem();
      status.resolved = true;
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
    if (!this.currentItem && this.correct) {
      this.endGame();
    }
    this.applyChanges();
  }
  ngOnDestroy(): void {
    this.stopTimer();
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }
  endGame(): void {
    this.stopTimer();

    this.dialog.open(ResultsModalComponent, {
      width: '350px',
      height: '500px',
      data: this.setResultsModalData(),
    });
  }

  private setResultsModalData(): ResultsModalData {
    return {
      fails: this.fails,
      total: this.correct,
      seconds: this.seconds,
    };
  }
  private applyChanges(): void {
    if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
