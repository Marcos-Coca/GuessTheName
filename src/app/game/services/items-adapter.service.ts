import { Injectable } from '@angular/core';

import { GameModule } from '@app/game/game.module';

import { Item } from '../models/item.model';
import { ItemService } from '../models/item-service.model';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: GameModule
})
export class ItemsAdapterService implements ItemService {

  private readonly items: object = {
    1: PokemonService
  };

  constructor(pokemonServices: PokemonService) { }
  getItems(itemId: string): Item[] {
    throw new Error('Method not implemented.');
  }
}
