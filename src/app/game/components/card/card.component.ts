import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CardService } from '@game/services/card.service';
import { Card } from '@game/models/card.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  selectCard(): void {
    this.cardService.cardStatus$.pipe(first()).subscribe((newStatus) => {
      this.card.status = newStatus;
    });
    this.cardService.selectCard(this.card);
  }
}
