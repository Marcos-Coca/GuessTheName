import { Item } from './item.model';
export interface ItemService{
    getItems(itemId: string): Item[];
}
