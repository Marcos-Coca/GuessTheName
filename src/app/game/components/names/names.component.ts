import { Component, OnInit, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';

import { Item } from '@game/models/item.model';
@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamesComponent implements OnInit, OnChanges {
  @Input() items: Item[] = [];
  names: string[] = [];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.setNames();
  }
  setNames(): void {
    this.names = this.items.map((item): string => item.name);
    this.names.sort();
  }
}
