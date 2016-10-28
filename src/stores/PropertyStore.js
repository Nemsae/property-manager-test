import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

let _properties = [];
let _propertyTenants = undefined;
let _tenants = [];

class PropertyStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case types.RECEIVE_PROPERTIES: {
          let { properties } = action.payload;
          _properties = properties;
          this.emit('CHANGE');
        } break;
        case types.RECEIVE_PROPERTY_TENANTS: {
          let { property } = action.payload;
          _propertyTenants = property;
          this.emit('CHANGE');
        } break;
        case types.RECEIVE_TENANTS: {
          let { tenants } = action.payload;
          // console.log('tenants: ', tenants);
          _tenants = tenants;
          // console.log('_tenants: ', _tenants);
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getProperties () {
    return _properties;
  }

  getTenants () {
    return _tenants;
  }

  getPropTenants () {
    return _propertyTenants;
  }
}

export default new PropertyStore();
