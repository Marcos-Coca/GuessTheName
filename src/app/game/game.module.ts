import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game/game.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';

import { ItemsAdapterService } from './services/items-adapter.service';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [GameComponent, CardsComponent, CardComponent, HomeComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  providers: [
    ItemsAdapterService,
    PokemonService
  ]
})
export class GameModule { }
