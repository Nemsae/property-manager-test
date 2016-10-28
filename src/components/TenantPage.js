import React, { Component } from 'react';

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';
import TenantForm from './TenantForm';

export default class TenantPage extends Component {
  constructor () {
    super();

    this.state = {
      tenants: PropertyStore.getTenants()
    };

    this._onChange = this._onChange.bind(this);
    this._convertToPhone = this._convertToPhone.bind(this);
    this._updateTenant = this._updateTenant.bind(this);
  }

  componentWillMount () {
    PropertyActions.fetchTenants();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      tenants: PropertyStore.getTenants()
    });
  }

  _convertToPhone (number) {
    let arr = number.toString().split('');
    arr.splice(0, 0, '(');
    arr.splice(4, 0, ')');
    arr.splice(8, 0, '-');
    let result = arr.join('');
    return result;
  }

  _removeTenant (id) {
    console.log('id: ', id);
    PropertyActions.removeTenant(id);
  }

  _updateTenant (tenant) {
    let updatedTenant = {
      name: this.refs[tenant._id + tenant.name].value,
      age: this.refs[tenant._id + tenant.age].value,
      email: this.refs[tenant._id + tenant.email].value,
      phone: this.refs[tenant._id + tenant.phone].value
    };
    PropertyActions.updateTenant(tenant._id, updatedTenant);
  }

  render () {
    let { tenants } = this.state;
    console.log('tenants: ', tenants);
    return (
      <div className='text-center'>
        <h1>Tenants</h1>
        <TenantForm />
        {
          tenants.map((tenant) => {
            let phoneNumber = this._convertToPhone(tenant.phone);
            return (
              <div className='propertyCard col-xs-4' key={tenant._id}>
                <h2>{tenant.name}</h2>
                <h4>Age: {tenant.age}</h4>
                <h4>Email: {tenant.email}</h4>
                <h4>Phone: {phoneNumber}</h4>
                {/* <h4>Phone: {tenant.phone}</h4> */}
                {/* <h3>Rent: ${tenant.rentPay}</h3> */}
                <button className='btn btn-secondary' data-toggle='modal' data-target={`#modal${tenant._id}`}>Edit</button>

                <div className='modal fade' id={`modal${tenant._id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>Tenants Info</h4>
                      </div>
                        {
                          <div className='modal-body'>
                            <input className='col-xs-12' type='text' ref={tenant._id + tenant.name} defaultValue={tenant.name} />
                            <input className='col-xs-12' type='number' ref={tenant._id + tenant.age} defaultValue={tenant.age} />
                            <input className='col-xs-12' type='text' ref={tenant._id + tenant.email} defaultValue={tenant.email} />
                            <input className='col-xs-12' type='text' ref={tenant._id + tenant.phone} defaultValue={tenant.phone} />
                          </div>
                        }
                      <div className='modal-footer'>
                        <button type='button' onClick={this._removeTenant.bind(this, tenant._id)} className='btn btn-danger' data-dismiss='modal'>Remove Tenant</button>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Edit</button>
                        <button type='button' onClick={this._updateTenant.bind(this, tenant)} className='btn btn-primary' data-dismiss='modal'>Submit Changes</button>
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
