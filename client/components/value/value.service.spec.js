'use strict';

describe('Service: value', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var value;
  beforeEach(inject(function (_value_) {
    value = _value_;
  }));

  it('should do something', function () {
    expect(!!value).toBe(true);
  });

});
