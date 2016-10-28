import React, { Component } from 'react';

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';
import PropertyForm from './PropertyForm';

export default class PropertyPage extends Component {
  constructor () {
    super();

    this.state = {
      properties: PropertyStore.getProperties(),
      propertyTenant: PropertyStore.getPropTenants(),
      tenants: PropertyStore.getTenants(),
      propertyId: ''
    };

    this._onChange = this._onChange.bind(this);
    this._convertToPhone = this._convertToPhone.bind(this);
  }

  componentWillMount () {
    PropertyActions.fetchProperties();
    PropertyActions.fetchTenants();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      properties: PropertyStore.getProperties(),
      propertyTenant: PropertyStore.getPropTenants(),
      tenants: PropertyStore.getTenants()
    });
  }

  _fetchPropTenants (propId) {
    PropertyActions.fetchPropTenants(propId);
    this.setState({
      propertyId: propId
    });
  }

  _deleteProperty (id) {
    PropertyActions.removeProperty(id);
  }

  _addTenantToProperty (propertyId, tenantId, tenant) {
    console.log('propertyId: ', propertyId);
    console.log('tenantId: ', tenantId);
    tenant.rented = true;
    console.log('tenant: ', tenant);

    PropertyActions.addTenantToProperty(propertyId, tenantId);
    PropertyActions.updateTenant(tenantId, tenant);
  }

  _convertToPhone (number) {
    let arr = number.toString().split('');
    arr.splice(0, 0, '(');
    arr.splice(4, 0, ')');
    arr.splice(8, 0, '-');
    let result = arr.join('');
    return result;
  }

  _evictTenant (tenantId, tenant) {
    let { propertyId } = this.state;
    tenant.rented = false;
    console.log('tenant: ', tenant);
    PropertyActions.evictTenant(tenantId, propertyId);
    PropertyActions.updateTenant(tenantId, tenant);
  }

  render () {
    let { properties, propertyTenant, tenants } = this.state;
    let PropertyTenant = [];
    console.log('tenants: ', tenants);

    if (propertyTenant !== undefined) {
      PropertyTenant =
      propertyTenant.tenants.map((tenant, i) => {
        let tenantPhone = this._convertToPhone(tenant.phone);
        return (
          <div key={i}>
            <h4>Tenant: {tenant.name}</h4>
            <h4>Phone: {tenantPhone}</h4>
            <button className='btn btn-danger' onClick={this._evictTenant.bind(this, tenant._id, tenant)} data-dismiss='modal'>Evict</button>
          </div>
        );
      });
    }

    return (
      <div className='text-center'>
        <h1>Properties</h1>
        <PropertyForm />
        {
          properties.map((property) => {
            let roomCost = 300 * property.bedrooms;
            let bathCost = 200 * property.bathrooms;
            let rentTotal = roomCost + bathCost;
            return (
              <div className='propertyCard col-xs-12' key={property._id}>
                <h2>{property.address}<button onClick={this._deleteProperty.bind(this, property._id)} className='btn btn-danger'>X</button></h2>
                <h4>Bedrooms: {property.bedrooms}</h4>
                <h4>Bathrooms: {property.bathrooms}</h4>
                <h4>Rent Base: {property.baseRent}</h4>
                <h3>Total Rent: ${rentTotal}</h3>

                <button className='btn btn-default' data-toggle='modal' data-target={`#modal${property._id}`} onClick={this._fetchPropTenants.bind(this, property._id)}>Tenants</button>

                <div className='modal fade' id={`modal${property._id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>Tenants Info</h4>
                      </div>
                      <div className='modal-body'>
                        {
                          PropertyTenant
                        }
                      </div>
                      <div className='modal-footer text-center'>
                        <div className='btn-group text-center'>
                          <button type='button jayButton' className='btn btn-success dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add Tenant</button>
                          <div className='dropdown-menu'>
                          {
                            tenants.map((tenant) => {
                              if (tenant.rented === true) {
                                return;
                              } else {
                                return (
                                  <a className='dropdown-item dropDownBro' data-dismiss='modal' href='#' onClick={this._addTenantToProperty.bind(this, property._id, tenant._id, tenant)} key={tenant._id}>{tenant.name}</a>
                                );
                              }
                            })
                          }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
