import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game/game.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';

import { PokemonService } from './services/pokemon.service';
import { ItemsAdapterService } from './services/items-adapter.service';
import { NamesComponent } from './components/names/names.component';


@NgModule({
  declarations: [GameComponent, CardsComponent, CardComponent, HomeComponent, NamesComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    HttpClientModule
  ],
  providers: [
    ItemsAdapterService,
    PokemonService
  ]
})
export class GameModule { }
