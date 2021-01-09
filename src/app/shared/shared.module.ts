import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material/material.module';

import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { ResultsModalComponent } from './components/results-modal/results-modal.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [MinuteSecondsPipe, ResultsModalComponent, TimerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MinuteSecondsPipe, ResultsModalComponent, TimerComponent],
})
export class SharedModule {}
