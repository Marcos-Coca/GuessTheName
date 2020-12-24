import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

import { GameModule } from '@app/game/game.module';
import { Pokemon } from '../models/pokemon.model';
import { PokemonResponse } from '../models/pokemon-response.model';

@Injectable({
  providedIn: GameModule
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(): Observable<Pokemon[]>{
    return this.http
    .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon/?limit=151&')
    .pipe(
      mergeMap(({url}) => this.http.get<Pokemon>(url)),
      toArray()
    );
  }

}
