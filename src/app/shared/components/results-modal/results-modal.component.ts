import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResultsModalData } from '@shared/models/results-modal-data.model';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.scss'],
})
export class ResultsModalComponent implements OnInit {
  percent: number;
  date = Date.now();

  constructor(
    public dialogRef: MatDialogRef<ResultsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResultsModalData
  ) {
    this.percent = Math.round((data.total / (data.total + data.fails)) * 100);
  }

  ngOnInit(): void {}

  onClick(): void {
    this.dialogRef.close();
  }
}
