import { TestBed, inject } from '@angular/core/testing';

import { OrdererService } from './orderer.service';

describe('OrdererService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdererService]
    });
  });

  it('should be created', inject([OrdererService], (service: OrdererService) => {
    expect(service).toBeTruthy();
  }));
});
