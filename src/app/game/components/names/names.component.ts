import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';

import { Name } from '@game/models/name.model';


@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamesComponent implements OnInit {

  @Input() name: Name = {} as Name;

  constructor() { }

  ngOnInit(): void {
  }

}
