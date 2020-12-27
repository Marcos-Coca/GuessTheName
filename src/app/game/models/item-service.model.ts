import { Observable } from 'rxjs';
import { Item } from './item.model';
export interface ItemService{
    getItems(itemId: string): Observable<Item[]>;
}
