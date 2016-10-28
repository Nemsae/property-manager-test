process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../testapp');
const { expect } = chai;
const Tenant = require('../models/Tenant');

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

   describe('/tenants', () => {
     beforeEach(() => {
       // empty data from db
       // add some sample data
      //  return Tenant.remove({})
      //   .then(() => {
      return Tenant.create({name: 'Jay', age: 16, email: 'fckyahman', phone: 6502435667, rented: true});
        // });
      });

      after(() => {
        return Tenant.remove({});
      });

      it('should respond with an array of tenant', () => {
        return chai.request(app)
        .get('/api/tenants')
        .then((res) => {
          let tenants = res.body;
          let tenant = tenants[0];
          console.log('tenants: ', tenants);
          tenantId = tenant._id;
          expect(res).to.have.status(200);
          expect(tenants).to.have.length(1);
          expect(tenants[0].name).to.equal('Jay');
        });
      });
      let updatedObj = { name: 'Jay & Z' };
      // let updatedObj = { name: 'Jay & Z', age: 43, email: 'zhibby@blah.com', phone: 6502435237, rented: false };
      it('should respond with a updated tenant', () => {
        return chai.request(app)
        .put(`/api/tenants/${tenantId}`)
        .send(updatedObj)
        .then((res) => {
          let tenant = res.body;
          expect(res).to.have.status(200);
          expect(tenant.name).to.equal('Jay & Z');
        });
      });
      let obj = { name: 'Z', age: 18, email: 'blabbity@blah.com', phone: 6502435237, rented: true };
      it('should respond with a new tenant', () => {
       return chai.request(app)
        .post('/api/tenants')
          .send(obj)
          .then((res) => {
            let tenant = res.body;
            expect(res).to.have.status(200);
            // expect(tenant).to.have.length(1);
            expect(tenant.name).to.equal('Z');
          });
      });
      it('should respond with the deleted tenant', () => {
       return chai.request(app)
        .delete(`/api/tenants/${tenantId}`)
          .then((res) => {
            console.log('res.body: ', res.body);
            let tenant = res.body;
            expect(res).to.have.status(200);
            expect(tenant.name).to.equal('Jay & Z');
          });
      });
   });
 });
