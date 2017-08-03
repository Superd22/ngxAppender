import { SharedServiceExampleService } from './shared-service-example/shared-service-example.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAppenderModule } from '../../src'
import { NgxappenderDemoComponent } from './ngx-appender-demo.component';
import { AppendInputOutputComponent } from './append-input-output/append-input-output.component';
import { AppendServiceComponent } from './append-service/append-service.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NgxappenderDemoComponent,
    AppendInputOutputComponent,
    AppendServiceComponent
  ],
  imports: [
    BrowserModule,
    NgxAppenderModule,
    FormsModule,
  ],
  providers: [SharedServiceExampleService],
  entryComponents: [
    AppendInputOutputComponent,
    AppendServiceComponent
  ],
  bootstrap: [NgxappenderDemoComponent]
})
export class NgxappenderDemoModule { }
