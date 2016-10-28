import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

const ServerActions = {
  receiveProperties (properties) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_PROPERTIES,
      payload: { properties }
    });
  },

  receivePropTenants (property) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_PROPERTY_TENANTS,
      payload: { property }
    });
  },

  receiveTenants (tenants) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_TENANTS,
      payload: { tenants }
    });
  }
};

export default ServerActions;
