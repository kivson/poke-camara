/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CongressistaService } from './congressista.service';

describe('Service: Congressista', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongressistaService]
    });
  });

  it('should ...', inject([CongressistaService], (service: CongressistaService) => {
    expect(service).toBeTruthy();
  }));
});
