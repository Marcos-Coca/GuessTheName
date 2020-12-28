import { Component, OnInit } from '@angular/core';

import { Card } from '@game/models/card.model';
import { Item } from '@game/models/item.model';
import { ItemsAdapterService } from '@game/services/items-adapter.service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  cards: Card[] = [];
  cardsRecord = new Map<number, Card>();

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
      items.forEach((item) => this.setCard(item));
    });
  }

  clickCard(name: string): void{
    // this.names[0].id === id ? console.log('YEPPAAA') : console.log('Faill');
    console.log(name);
  }

  private setCard({id, name, photoUrl}: Item): void{
    const card: Card = {
      photoUrl,
      failed : false,
      resolved: false,
      name: this.capitalize(name),
    };

    this.cards.push(card);
    this.cardsRecord.set(id, card);
  }

  private capitalize(s: string): string {
    if (typeof s !== 'string') {  return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
