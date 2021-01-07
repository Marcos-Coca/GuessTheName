import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.scss'],
})
export class ResultsModalComponent implements OnInit {
  @Input() seconds!: number;
  @Input() fails!: number;
  @Input() total!: number;

  percent: number = (this.total / (this.total + this.fails)) * 100;

  constructor() {}

  ngOnInit(): void {}
}
