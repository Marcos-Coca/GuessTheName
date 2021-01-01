import { Item } from '@game/models/item.model';
import { CardStatus } from '@game/models/card-status.model';

export interface Card {
  item: Item;
  status: CardStatus;
}
