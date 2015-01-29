'use strict';

var should = require('should');
var app = require('../../app');
var Value = require('./value.model');

describe('Value Model', function() {
	before(function(done) {
	    // Clear before testing
	    Value.remove().exec().then(function() {
	    	done();
	    });
	});

	it('should save value with sections', function (done) {
	 	new Value({
	  		name: 'Form1',
	  		info: 'About form',
	  		_module: module,
	  		sections: {
		        'Section 1': {
		            'Field 1' : '1',
		          },
		        'Section 2': {
		            'Field 1': '1',
		            'Field 2': 2
		          }
	      		}
		  	}).save(function (err, value){
		  		value.sections['Section 2']['Field 2'].should.equal(2);
		  		done();
		  	});
	});
});