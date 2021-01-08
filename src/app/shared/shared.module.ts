import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material/material.module';

import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { ResultsModalComponent } from './components/results-modal/results-modal.component';

@NgModule({
  declarations: [MinuteSecondsPipe, ResultsModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MinuteSecondsPipe, ResultsModalComponent],
})
export class SharedModule {}
