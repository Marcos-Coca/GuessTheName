import { CardItem } from '@game/models/card-item.model';
import { CardStatus } from '@game/models/card-status.model';

export interface Card {
  id: number;
  item: CardItem;
  status: CardStatus;
}
