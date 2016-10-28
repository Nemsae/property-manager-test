import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';
import PropertyData from './PropertyData';

export default class PropertyForm extends Component {
  constructor () {
    super();

    this.state = {
      address: '',
      bedrooms: '',
      bathrooms: '',
      baseRent: ''
    };

    this._grabInput = this._grabInput.bind(this);
    this._addNewProperty = this._addNewProperty.bind(this);
  }

  _grabInput (e) {
    let input = e.target.id;
    let value = e.target.value;
    this.setState({
      [input]: value
    });
  }

  _addNewProperty () {
    let { address, bedrooms, bathrooms, baseRent } = this.refs;
    address.value = '';
    bedrooms.value = '';
    bathrooms.value = '';
    baseRent.value = '';
    PropertyActions.sendNewProperty(this.state);
  }

  render () {
    return (
      <div>
        <button className='btn btn-primary' data-toggle='modal' data-target='#myModal'>Add New Property</button>
        <PropertyData />
        <div className='modal fade' id='myModal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
                <h4 className='modal-title' id='myModalLabel'>Add New Property</h4>
              </div>
              <div className='modal-body'>
                <input className='col-xs-12' onChange={this._grabInput} type='text' id='address' ref='address' placeholder='Type in address...' />
                <input className='col-xs-12' onChange={this._grabInput} type='number' id='bedrooms' ref='bedrooms' placeholder='Type in number of bedrooms...' min='1' max='130' />
                <input className='col-xs-12' onChange={this._grabInput} type='number' id='bathrooms' ref='bathrooms' placeholder='Type in number of bathrooms...' />
                <input className='col-xs-12' onChange={this._grabInput} type='number' id='baseRent' ref='baseRent' placeholder='Type in base rent...' />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Entry</button>
                <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._addNewProperty} >Submit Entry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
