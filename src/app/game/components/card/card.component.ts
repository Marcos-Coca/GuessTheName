import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Card } from '@app/game/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: Card;
  @Output() cardClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectCard(): void{
    this.cardClicked.emit(this.card.name);
  }

}
