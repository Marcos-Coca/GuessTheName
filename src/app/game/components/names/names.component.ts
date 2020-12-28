import { Component, OnInit, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';

import { Card } from '@game/models/card.model';


@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamesComponent implements OnInit, OnChanges {

  @Input() cards: Card[] = [];
  names: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    this.setNames();
  }
  setNames(): void{
    this.names = this.cards.map((card): string => card.name);
    this.names.sort();
  }

}
