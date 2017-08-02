import { DomComponentCacheService } from './services/dom-component-cache.service';
import { NgxAppenderService } from './services/ngx-appender.service';
import { Injector } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NgxAppenderService, DomComponentCacheService],
  declarations: []
})
export class NgxAppenderModule {
  constructor(private ngx: NgxAppenderService) {
  }
}
