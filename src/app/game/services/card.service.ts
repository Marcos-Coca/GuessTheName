import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Card } from '@game/models/card.model';
import { CardStatus } from '@game/models/card-status.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private card = new Subject<Card>();
  private cardStatus = new Subject<CardStatus>();

  card$ = this.card.asObservable();
  cardStatus$ = this.cardStatus.asObservable();

  constructor() {}

  setUpdatedCardStatus(cardStatus: CardStatus): void {
    this.cardStatus.next(cardStatus);
  }

  selectCard(card: Card): void {
    this.card.next(card);
  }
}
