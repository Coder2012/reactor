'use strict';

describe('Service: FlightService', function () {

  // load the service's module
  beforeEach(module('reactorApp'));

  // instantiate service
  var FlightService;
  beforeEach(inject(function (_FlightService_) {
    FlightService = _FlightService_;
  }));

  it('should do something', function () {
    expect(!!FlightService).toBe(true);
  });

});
