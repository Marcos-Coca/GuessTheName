import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  template: `
    <p>
      game works!
    </p>
  `,
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
