import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef,
} from '@angular/core';

import { first } from 'rxjs/operators';

import { Card } from '@game/models/card.model';
import { CardService } from '@game/services/card.service';
import { CardStatus } from '@app/game/models/card-status.model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private cdRef: ChangeDetectorRef
  ) {}
  @Input() card!: Card;

  ngOnInit(): void {}

  selectCard(): void {
    this.cardService.cardStatus$.pipe(first()).subscribe((newStatus) => {
      this.updateStatus(newStatus);
      if (this.card.status.incorrect) {
        this.resetIncorrect();
      }
    });
    this.cardService.selectCard(this.card);
  }

  updateStatus(newStatus: CardStatus): void {
    const status = { ...newStatus };
    this.card = { ...this.card, status };
    this.applyChanges();
  }

  resetIncorrect(): void {
    setTimeout(this.setIncorrect.bind(this), 1500);
  }

  setIncorrect(): void {
    const newStatus: CardStatus = Object.assign(this.card.status, {
      incorrect: false,
    });
    this.updateStatus(newStatus);
  }

  private applyChanges(): void {
    if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
