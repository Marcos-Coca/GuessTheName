import { Component, OnInit } from '@angular/core';

import { Item } from '@game/models/item.model';
import { Card } from '@game/models/card.model';

import { CardService } from '@game/services/card.service';
import { ItemsAdapterService } from '@game/services/items-adapter.service';
import { CardStatus } from '@game/models/card-status.model';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  items: Item[] = [];
  updatedCard: Card | undefined;

  constructor(
    private itemsAdapterService: ItemsAdapterService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
    this.onClickCard();
  }

  fetchItems(): void {
    this.itemsAdapterService.getItems('1').subscribe((items) => {
      this.items = items.map((item) => ({
        ...item,
        name: this.capitalize(item.name),
      }));
    });
  }

  onClickCard(): void {
    this.cardService.card$.subscribe((card: Card) => {
      console.log('GAME', card);
      const cardStatus: CardStatus = { failed: true, resolved: false };
      this.cardService.setUpdatedCardStatus(cardStatus);
    });
  }

  private capitalize(s: string): string {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
