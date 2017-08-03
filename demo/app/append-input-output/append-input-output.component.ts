import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

@Component({
  selector: 'ngx-appender-append-input-output',
  templateUrl: './append-input-output.component.html',
  styleUrls: ['./append-input-output.component.scss']
})
export class AppendInputOutputComponent implements OnInit {

  @Input()
  public input: string;
  public inputStatic: string;

  @Output()
  public output: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
  }

}
