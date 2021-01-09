import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  ViewRef,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnChanges, OnDestroy {
  @Input() end = false;
  @Input() running = false;

  @Output() stop = new EventEmitter<number>();

  timer: any;
  seconds = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const end = changes.end;
    const running = changes.running;
    if (running) {
      running.currentValue ? this.startTimer() : this.stopTimer();
    }
    if (end) {
      if (end.currentValue) {
        this.finishTimer();
      }
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.seconds += 1;
      this.applyChanges();
    }, 1000);
  }

  finishTimer(): void {
    this.stopTimer();
    console.log(this.seconds);
    this.stop.emit(this.seconds);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  private applyChanges(): void {
    if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
