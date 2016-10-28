import API from '../API';

const PropertyActions = {
  fetchProperties () {
    API.fetchProperties();
  },

  fetchPropTenants (id) {
    API.fetchPropTenants(id);
  },

  fetchTenants () {
    API.fetchTenants();
  },

  sendNewTenant (newTenant) {
    API.sendNewTenant(newTenant);
  },

  removeTenant (id) {
    API.removeTenant(id);
  },

  removeProperty (id) {
    API.removeProperty(id);
  },

  updateTenant (id, updatedTenant) {
    API.updateTenant(id, updatedTenant);
  },

  sendNewProperty (newProperty) {
    API.sendNewProperty(newProperty);
  },

  addTenantToProperty (propertyId, tenantId) {
    API.addTenantToProperty(propertyId, tenantId);
  }
};

export default PropertyActions;
