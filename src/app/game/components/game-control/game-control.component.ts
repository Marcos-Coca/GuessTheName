import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

import { Card } from '@app/game/models/card.model';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlComponent implements OnInit {

  @Input() readonly cards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
