import { SharedServiceExampleService } from './../shared-service-example/shared-service-example.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-appender-append-service',
  templateUrl: './append-service.component.html',
  styleUrls: ['./append-service.component.scss']
})
export class AppendServiceComponent implements OnInit {

  public counter: number;

  constructor(public service: SharedServiceExampleService) {
    service.counterChange.subscribe((counter) => this.counter = counter);
  }

  ngOnInit() {
  }

}
