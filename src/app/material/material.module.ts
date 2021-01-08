import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [MatDialogModule, MatButtonModule],
})
export class MaterialModule {}
