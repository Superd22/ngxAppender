import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
@Injectable()
export class SharedServiceExampleService {

  public counterChange: ReplaySubject<number> = new ReplaySubject(1);
  private _counter: number;

  public get counter(): number { return this._counter; }
  public set counter(n: number) { this._counter = n; this.counterChange.next(n); }

  constructor() {
    this.counter = 1;
    setInterval(() => {
      this.counter++;
    }, 1000);
  }

}
