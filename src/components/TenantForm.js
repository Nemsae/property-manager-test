import React, { Component } from 'react';

// import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';

export default class TenantForm extends Component {
  constructor () {
    super();

    this.state = {
      name: '',
      age: '',
      email: '',
      phone: '',
      rented: false
    };

    this._grabInput = this._grabInput.bind(this);
    this._addNewTenant = this._addNewTenant.bind(this);
  }

  _grabInput (e) {
    let input = e.target.id;
    let value = e.target.value;
    this.setState({
      [input]: value
    });
  }

  _addNewTenant () {
    let { name, age, email, phone, rented } = this.refs;
    name.value = '';
    age.value = '';
    email.value = '';
    phone.value = '';
    PropertyActions.sendNewTenant(this.state);
  }

  render () {
    return (
      <div>
        <button className='btn btn-primary' data-toggle='modal' data-target='#myModal'>Add New Tenant</button>

        <div className='modal fade' id='myModal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
                <h4 className='modal-title' id='myModalLabel'>Add New Tenant</h4>
              </div>
              <div className='modal-body'>
                <input className='col-xs-12' onChange={this._grabInput} type='text' id='name' ref='name' placeholder='Type in name...' />
                <input className='col-xs-12' onChange={this._grabInput} type='number' id='age' ref='age' placeholder='Type in age...' min='1' max='130' />
                <input className='col-xs-12' onChange={this._grabInput} type='text' id='email' ref='email' placeholder='Type in email...' />
                <input className='col-xs-12' onChange={this._grabInput} type='text' id='phone' ref='phone' placeholder='Type in phone...' />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Entry</button>
                <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._addNewTenant} >Submit Entry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
