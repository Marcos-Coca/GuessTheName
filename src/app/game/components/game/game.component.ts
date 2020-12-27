import { Component, OnInit } from '@angular/core';

import { Item } from '@app/game/models/item.model';
import { Name } from '@app/game/models/name.model';
import { ItemsAdapterService } from '@game/services/items-adapter.service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  items: Item[] = [];
  names: Name[] = [];

  constructor(
    private itemsAdapterService: ItemsAdapterService
    ) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void{
    this.itemsAdapterService
    .getItems('1')
    .subscribe((items) => {
      this.items = items.map((item) => ({...item, name: this.capitalize(item.name)}));
      this.setNames();
    });
  }
  setNames(): void{
    this.names = this.items.map((item): Name => ({id: item.id, name: item.name}));
    this.names.sort();
  }

  private capitalize(s: string): string {
    if (typeof s !== 'string') {  return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
