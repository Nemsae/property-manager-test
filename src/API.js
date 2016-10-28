import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  fetchProperties () {
    axios.get('/api/properties')
      .then((res) => {
        ServerActions.receiveProperties(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchProperties', err);
      });
  },

  fetchPropTenants (propId) {
    axios.get(`/api/properties/${propId}`)
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receivePropTenants(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchPropTenants', err);
      });
  },

  fetchTenants () {
    axios.get('/api/tenants/')
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receiveTenants(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchTenants', err);
      });
  },

  sendNewTenant (newTenant) {
    axios.post('/api/tenants/', newTenant)
    .then(this.fetchTenants())
    .then((res) => {
      console.log('res.data: ', res.data);
      ServerActions.receiveTenants(res.data);
    })
    .catch((err) => {
      console.log('ERROR! API.sendNewTenant', err);
    });
  },

  sendNewProperty (newProperty) {
    axios.post('/api/properties/', newProperty)
    .then(this.fetchProperties())
    .then((res) => {
      console.log('res.data: ', res.data);
      ServerActions.receiveProperties(res.data);
    })
    .catch((err) => {
      console.log('ERROR! API.sendNewProperty', err);
    });
  },

  removeTenant (id) {
    axios.delete(`/api/tenants/${id}`)
      .then(this.fetchTenants())
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receiveTenants(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.removeTenant', err);
      });
  },

  removeProperty (id) {
    axios.delete(`/api/properties/${id}`)
      .then(this.fetchProperties())
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receiveProperties(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.removeProperty', err);
      });
  },

  updateTenant (id, updatedTenant) {
    axios.put(`/api/tenants/${id}`, updatedTenant)
      .then(this.fetchTenants())
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receiveTenants(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.updateTenant', err);
      });
  },

  addTenantToProperty (propertyId, tenantId) {
    axios.put(`/api/properties/${propertyId}/addTenant/${tenantId}`)
      .then(this.fetchProperties())
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receiveProperties(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.updateTenant', err);
      });
  }
};

export default API;
