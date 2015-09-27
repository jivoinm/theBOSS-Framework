/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Module = require('../api/module/module.model');
var Form = require('../api/form/form.model');
var Value = require('../api/value/value.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    role: 'test',
    owner: 'owner1'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    owner: 'owner1'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@user.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});
Value.find({}).remove(function(){
  console.log('removed values');
});
Form.find({}).remove(function() {
  //create form1
  Form.create({
    name: 'Form1',
    sections: [
      {
        name: 'Section 1',
        key: 'section_1',
        fields: [
          {
            title: 'Field 1.1',
            key: 'field_1_1',
            type: 'number',
            prefix: 'm',
            default_value: '',
            require: true,
            position: 0
          }, {
            title: 'Field 1.2',
            key: 'field_1_2',
            type: 'number',
            prefix: 'm',
            default_value: '',
            require: true,
            position: 0
          }, {
            title: 'Field 1.3',
            key: 'field_1_3',
            type: 'number',
            prefix: 'm',
            default_value: '',
            require: true,
            position: 0
          }, {
            title: 'Calculate',
            key: 'calculated',
            type: 'formula',

            options: '=sections.section_1.field_1_1*sections.section_1.field_1_2/sections.section_1.field_1_3',
            prefix: 'm2',
            default_value: '0',
            require: true,
            position: 0
          }
        ]
      },
      {
        name: 'Section 2',
        key: 'section_2',
        fields: [
          {
            title: 'Field 2.1',
            key: 'field_2_1',
            type: 'text',
            default_value: '',
            require: true,
            position: 0
          }, {
            title: 'Field 2.2',
            key: 'field_2_2',
            type: 'text',
            default_value: '',
            require: true,
            position: 0
          }
        ]
      }
    ],
    listItems: [
      {
        name: 'Field 1.1',
        key: 'sections.section_1.field_1_1'
      },
      {
        name: 'Field 1.2',
        key: 'sections.section_1.field_1_2'
      },
      {
        name: 'Calculate',
        key: 'sections.section_1.calculated'
      }

    ]
  }, function(err, form){
    console.log('finished populating forms');
    Module.find({}).remove(function() {
      Module.create({
        name: 'Module1',
        active: true,
        roles: ['admin','test'],
        owner: 'owner1',
        _forms: [{formId: form._id, name: form.name}]
      }, function(err, module){
        //console.log('finished populating module', module);
        form._module = {moduleId: module._id, name: module.name};
        form.update(function(){
          console.log('updated form module');
          // add some values
          for (var i = 0; i < 70; i++) {
            Value.create({
              _form: {
                formId: form._id,
                name: form.name,
                info: form.info
              },
              sections: {
                section_1: {
                  field_1_1: {
                    value: i,
                    field: form.sections[0].fields[0]
                  },
                  field_1_2: {
                    value: 2,
                    field: form.sections[0].fields[1]
                  },
                  field_1_3: {
                    value: 2,
                    field: form.sections[0].fields[1]
                  }
                }
              }
            });
          }
        });
      });
    });
  });
});
