import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@app/material/material.module';

import { SharedModule } from '@shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game/game.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';

import { PokemonService } from './services/pokemon.service';
import { ItemsAdapterService } from './services/items-adapter.service';
import { NamesComponent } from './components/names/names.component';
import { GameControlComponent } from './components/game-control/game-control.component';
import { BackgroundDirective } from './directives/background.directive';

@NgModule({
  declarations: [
    GameComponent,
    CardsComponent,
    CardComponent,
    HomeComponent,
    NamesComponent,
    GameControlComponent,
    BackgroundDirective,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [ItemsAdapterService, PokemonService],
})
export class GameModule {}
