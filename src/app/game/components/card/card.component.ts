import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Item } from '@app/game/models/item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item!: Item;
  @Output() cardClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selectCard(): void{
    console.log('card clicked');
    this.cardClicked.emit(this.item.id);
  }

}
