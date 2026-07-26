import {
  TestBed
} from '@angular/core/testing';

import {
  NotificationService
} from './notification';


describe('NotificationService', () => {

  let service: NotificationService;


  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [
        NotificationService
      ]

    });


    service =
      TestBed.inject(
        NotificationService
      );

  });


  it('should be created', () => {

    expect(service)
      .toBeTruthy();

  });


  it('should add a message', () => {

    service.add(
      'Enrollment successful'
    );

    expect(
      service.getMessages()
    ).toContain(
      'Enrollment successful'
    );

  });


  it('should clear messages', () => {

    service.add(
      'Enrollment successful'
    );

    service.clear();

    expect(
      service.getMessages().length
    ).toBe(0);

  });

});