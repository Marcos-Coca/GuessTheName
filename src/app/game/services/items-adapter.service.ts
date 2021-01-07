import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import { Item } from '../models/item.model';
import { PokemonService } from './pokemon.service';
import { ItemService } from '../models/item-service.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsAdapterService implements ItemService {
  private items$ = new Observable<Item[]>();

  constructor(private pokemonService: PokemonService) {}

  getItems(itemId: string): Observable<Item[]> {
    const pokemons = this.pokemonService.getRandomPokemons(5);

    this.items$ = pokemons.pipe(
      map(
        (pokemon): Item => ({
          id: pokemon.id,
          name: pokemon.name,
          photoUrl: pokemon.sprites.front_default,
        })
      ),
      toArray()
    );

    return this.items$;
  }
}
