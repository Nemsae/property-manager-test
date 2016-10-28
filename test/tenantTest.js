process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;
const Tenant = require('../models/Tenant');

chai.use(chaiHttp);
 describe('API routes', () => {
   describe('root', () => {
     it('should respond with HTML', () => {
       return chai.request(app)
        .get('/')
        .then((res) => {
          expect(res).to.have.status(200);
          console.log('res.text: ', res.text);
        });
     });
   });

  //  const tenantSchema = new mongoose.Schema({
  //    name: { type: String, minLength: 1 },
  //    age: { type: Number, min: 1, max: 120 },
  //    email: { type: String },
  //    phone: { type: Number, minLength: 10 },
  //    rented: { type: Boolean, default: false }
  //  });

   describe('/tenants', () => {

     beforeEach(() => {
       // empty data from db
       // add some sample data
       return Tenant.remove({})
        .then(() => {
          return Tenant.create({name: 'Jay', age: 16, email: 'fckyahman', phone: 6502435667, rented: true})
        })
     })
     describe('GET', () => {
       it('should respond with an array of tenant', () => {
         return chai.request(app)
          .get('/api/tenants')
          .then((res) => {
            let tenants = res.body;
            expect(res).to.have.status(200);
            expect(tenants).to.have.length(1);
            expect(tenants[0].name).to.equal('Jay');
          });
       });
     });
   });
 });
