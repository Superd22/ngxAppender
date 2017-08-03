import { AppendInputOutputComponent } from './append-input-output/append-input-output.component';
import { NgxAppenderService } from './../../src/services/ngx-appender.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-appender-demo-root',
  templateUrl: './ngx-appender-demo.component.html',
  styleUrls: ['./ngx-appender-demo.component.scss']
})
export class NgxappenderDemoComponent {
  public inputExample: string = "";

  public constructor(private appender: NgxAppenderService) {

  }

  public appendNewDemo() {
    const parent = document.getElementById("append");
    const target = document.createElement("div");
    parent.appendChild(target);

    this.appender.loadComponentAtDom(AppendInputOutputComponent, target, { input: { object: this, property: "inputExample" }, inputStatic: { object: this.inputExample } });
  }
}
