'use strict';

var should = require('should');
var app = require('../../app');
var Module = require('./module.model');
var Form = require('../form/form.model');

describe('Module Model', function() {
  var module = new Module({
    name: 'Module1',
    info: 'About the module',
    active: true,
    owner: 'Owner1'
  });

  before(function(done) {
    // Clear modules before testing
    Module.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no modules', function(done) {
    Module.find({}, function(err, modules) {
      modules.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate module', function(done) {
    module.save(function() {
      var moduleDup = new Module(module);
      moduleDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an name', function(done) {
    module.name = '';
    module.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an owner', function(done) {
    module.owner = '';
    module.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should be able to populate linked forms', function(done) {

	var form1 = new Form({name: 'form1'}).save(function (err, form1) {
		var form2 = new Form({name: 'form2'}).save(function (err, form2) {
			module.name = 'Module1';
		  	module.owner = 'Owner1';
		  	module._forms = [];
		  	module._forms.push(form1);
		  	module._forms.push(form2);

		  	module.save(function(err, moduleSaved) {
		  		should.exist(moduleSaved._forms);
		  		Module.populate(moduleSaved, {path: '_forms'}, function (err, moduleSaved){
		  			moduleSaved._forms[0].name.should.equal('form1');
					done();
		  		});
		  		
		  	});
		});
	});

  });
});
