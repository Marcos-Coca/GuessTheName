import { Component, OnInit } from '@angular/core';

import { Item } from '@game/models/item.model';
import { Card } from '@game/models/card.model';

import { ItemsAdapterService } from '@game/services/items-adapter.service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  items: Item[] = [];
  updatedCard: Card | undefined;

  constructor(private itemsAdapterService: ItemsAdapterService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemsAdapterService.getItems('1').subscribe((items) => {
      this.items = items.map((item) => ({
        ...item,
        name: this.capitalize(item.name),
      }));
    });
  }

  private capitalize(s: string): string {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
