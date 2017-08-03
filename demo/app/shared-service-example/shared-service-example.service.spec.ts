import { TestBed, inject } from '@angular/core/testing';

import { SharedServiceExampleService } from './shared-service-example.service';

describe('SharedServiceExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedServiceExampleService]
    });
  });

  it('should be created', inject([SharedServiceExampleService], (service: SharedServiceExampleService) => {
    expect(service).toBeTruthy();
  }));
});
