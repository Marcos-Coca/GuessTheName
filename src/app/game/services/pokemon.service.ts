import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';


interface RandomNumbers{
  length: number;
  max: number;
  min?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getRandomPokemons(amount: number): Observable<Pokemon>{
    const pokemonsId = this.generateRandomNumbers({length: amount, max: 151});

    return from(pokemonsId).pipe(
      mergeMap(
        (id) => this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)));
  }

  private generateRandomNumbers({length, max, min = 1}: RandomNumbers): number[]{
    const numbers = new Set<number>();

    while (numbers.size < length)
    {
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(value);
    }

    return Array.from(numbers);

  }
}
