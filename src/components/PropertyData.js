import React, { Component } from 'react';

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';

export default class PropertyForm extends Component {
  constructor () {
    super();

    this.state = {
      properties: PropertyStore.getProperties(),
      tenants: PropertyStore.getTenants()
    };

    this._onChange = this._onChange.bind(this);
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
      tenants: PropertyStore.getTenants()
    });
  }

  render () {
    let { properties, tenants } = this.state;
    let propTotal = properties.length;

    let rentedNum = 0;
    properties.forEach((property) => {
      if (property.tenants.length) {
        rentedNum++;
      }
    });

    //  Calculate client total rented to
    let clientNum = 0;
    tenants.forEach((tenant) => {
      if (tenant.rented === true) {
        clientNum++;
      }
    });
    let rentTotal = 0;
    //  Calculate rent total
    properties.forEach((property) => {
      console.log('renTotal: ', rentTotal);
      let roomCost = 300 * property.bedrooms;
      let bathCost = 200 * property.bathrooms;
      let rentTotale = roomCost + bathCost;
      console.log('rentTotale: ', rentTotale);
      rentTotal += rentTotale;
    });
    return (
      <div className='text-center'>
        <h1>Table</h1>
        <table className='table'>
          <thead>
            <th>Properties</th>
            <th>Rented Properties</th>
            <th>Clients</th>
            <th>Income</th>
          </thead>
          <tbody>
            <tr>
              <td>{propTotal}</td>
              <td>{rentedNum}</td>
              <td>{clientNum}</td>
              <td>{rentTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
