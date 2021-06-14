const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');

chai.should();

chai.use(chaiHttp);

describe('User featues', () => {
  const userlogin = {
    username: 'user@gmail.com',
    password: '123456',
  };

  it('USER can post a loan Request and get all his loan request', (done) => {
    const agent = chai.request.agent(server);
    const body={
        amount:"500",
        period:"5"
    }
    agent
      .post('/login')
    //   logging in as a user
      .send(userlogin)
      .then((res) => {
          agent
          .post('/user/loanRequest')
          .send(body)
          .then((response)=>{
            response.should.have.status(201)
            response.body.should.have.property('message')
          })
          agent.get('/user/loanRequest')
          .then(response=>{
              response.should.have.status(200)
              response.body.should.have.a('array')
            done()
          })      
      })
      .catch((response) => {
        done(response);
      });
  });
  it('Get details and status of loans that are passed to the admin by agent',(done)=>{
    const agent = chai.request.agent(server);
    agent
      .post('/login')
    //   logging in as a user
      .send(userlogin)
      .then((res) => {
          agent.get('/user/loanRequest')
          .then(response=>{
              response.should.have.status(200)
              response.body.should.have.a('array')
            done()
          })      
      })
      .catch((response) => {
        done(response);
      });
  })

});
