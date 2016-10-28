import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/tenants'>Tenants</Link></li>
            <li><Link className='link' to='/properties'>Properties</Link></li>
          </ul>
        </div>
        <div className='container'>
          <div>
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}
