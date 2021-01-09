import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResultsModalData } from '@shared/models/results-modal-data.model';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.scss'],
})
export class ResultsModalComponent implements OnInit {
  date = Date.now();

  constructor(
    public dialogRef: MatDialogRef<ResultsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResultsModalData
  ) {}

  ngOnInit(): void {}

  onClick(): void {
    this.dialogRef.close();
  }
}
