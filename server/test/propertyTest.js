process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../testapp');
const { expect } = chai;
const Property = require('../models/Property');
const Tenant = require('../models/Tenant');
console.log('Tenant: ', Tenant);
let propertyId = '';
let tenantId = '';

chai.use(chaiHttp);
describe('API routes', () => {
  describe('root', () => {
    it('should respond with HTML', () => {
      return chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
      });
    });
  });

  describe('/properties', () => {
    before(() => {
      return Property.create({address: '34 Dover Ct.', bedrooms: 4, bathrooms: 3, baseRent: 300, tenants: []});
    });

    before(() => {
      return Tenant.create({name: 'JK', age: 100, email: 'nope', phone: 6501235667, rented: true});
    });

    after(() => {
      return Property.remove({});
    });

    after(() => {
      return Tenant.remove({});
    });

    it('should respond with an array of properties', () => {
      return chai.request(app)
      .get('/api/properties')
      .then((res) => {
        let properties = res.body;
        let property = properties[0];
        propertyId = property._id;
        expect(res).to.have.status(200);
        expect(properties).to.have.length(1);
        expect(properties[0].address).to.equal('34 Dover Ct.');
      });
    });
    it('should respond with an array of tenant', () => {
      return chai.request(app)
      .get('/api/tenants')
      .then((res) => {
        let tenants = res.body;
        console.log('tenants: ', tenants);
        let tenant = tenants[0];
        tenantId = tenant._id;
        expect(res).to.have.status(200);
      });
    });
    let updatedObj = { address: '838 Chrysopolis Dr.' };
    it('should respond with a updated property', () => {
      return chai.request(app)
      .put(`/api/properties/${propertyId}`)
      .send(updatedObj)
      .then((res) => {
        let property = res.body;
        expect(res).to.have.status(200);
        expect(property.address).to.equal('838 Chrysopolis Dr.');
      });
    });
    let obj = {address: '5 Queens Ct.', bedrooms: 8, bathrooms: 6, baseRent: 600, tenants: []};
    it('should respond with a new property', () => {
      return chai.request(app)
      .post('/api/properties')
      .send(obj)
      .then((res) => {
        let property = res.body;
        expect(res).to.have.status(200);
        expect(property.address).to.equal('5 Queens Ct.');
      });
    });
    it('should respond with property and added tenant', () => {
      return chai.request(app)
      .put(`/api/properties/${propertyId}/addTenant/${tenantId}`)
      .then((res) => {
        let property = res.body;
        expect(res).to.have.status(200);
        expect(property.tenants.length).to.equal(1);
      });
    });
    it('should respond with the deleted tenant', () => {
      return chai.request(app)
      .delete(`/api/properties/${propertyId}`)
      .then((res) => {
        let property = res.body;
        expect(res).to.have.status(200);
        expect(property.address).to.equal('838 Chrysopolis Dr.');
      });
    });
  });
});
