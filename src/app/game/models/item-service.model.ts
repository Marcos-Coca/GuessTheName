import { Item } from './item.model';
export interface ItemService{
    getItems(): Item[];
}
