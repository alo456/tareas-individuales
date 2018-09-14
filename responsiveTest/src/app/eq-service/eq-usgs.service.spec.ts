import { TestBed, inject } from '@angular/core/testing';

import { EqUsgsService } from './eq-usgs.service';

describe('EqUsgsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EqUsgsService]
    });
  });

  it('should be created', inject([EqUsgsService], (service: EqUsgsService) => {
    expect(service).toBeTruthy();
  }));
});
