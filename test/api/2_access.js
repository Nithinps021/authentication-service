const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
const userDetails = require('../../db/userDetails');
let server = require('../../index');

chai.should();

chai.use(chaiHttp);

describe('Checking permissions', () => {
  const userlogin = {
    username: 'user@gmail.com',
    password: '123456',
  };
  const agentlogin = {
    username: 'agent@gmail.com',
    password: '123456',
  };
  const adminlogin = {
    username: 'admin@gmail.com',
    password: '123456',
  };

  it('Only Agent have the permission to apply for loan and edit loan details', (done) => {
    let loanRequestId
    let loanApplicationId
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(agentlogin)
      .then((res) => {
        agent.get('/agent/loanRequests').then((response) => {
          loanRequestId=response.body[0]._id          
        });
      })
      .then(()=>{
        agent.get('/agent/appliedLoans').then((response) => {
          loanApplicationId=response.body[0]._id          
        });
      })
      .then(()=>{
        agent
        .post('/login')
        //   logged in as a user
        .send(userlogin)
        .then((res) => {
          agent
            .post(`/agent/appliedLoans`)
            .send({loanRequestId,rate:5})
            .then((response) => {
              response.should.have.status(403);
              response.body.should.have.property('message');
            })
        })
        .then(()=>{
          agent.post(`/agent/${loanApplicationId}`)
          .send({amount:10000,period:5})
            .then((response) => {
              response.should.have.status(403);
              response.body.should.have.property('message');
              done()
            })
        })
      })
  });

  it('Loan can be approved or rejected only by ADMIN', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      // loged in as user
      .send(userlogin)
      .then((res) => {
        // id of the loan to be approved or rejected
        agent
          .put('/admin/60c7875bb48e5e43a0d02a2e')
          .send({ loanApproved: true })
          .then((response) => {
            response.should.have.status(403);
            response.body.should.have.property('message');
          });
      });
    agent
      .post('/login')
      // loged in as agent
      .send(agentlogin)
      .then((res) => {
        // id of the loan to be approved or rejected
        agent.put('/admin/60c7875bb48e5e43a0d02a2e').then((response) => {
          response.should.have.status(403);
          response.body.should.have.property('message');
          done();
        });
      });
  });


  it('A user have no permission to view others loan details', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      // loged in as user
      .send(userlogin)
      .then((res) => {
        // id of an approved loan is pass
        agent
          .get('/agent/appliedLoans')
          .then((response) => {
            response.should.have.status(403);
            response.body.should.have.property('message');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
  });

  it('Admin and Agent have the permission to read and write user details', (done) => {
    const agent = chai.request.agent(server);
    var userId;
    agent
      .post('/login')
      // loged in as user
      .send(adminlogin)
      .then((res) => {
        agent
          .get('/getallusers')
          .then((response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
            userId = response.body[0]._id;
          })
          .then(() => {
            agent
              .put(`/getallusers/${userId}`)
              .send({ phoneNumber: 8412546985 })
              .then((response) => {
                response.should.have.status(200);
                done();
              })
              .catch((error) => {
                console.log(error);
                done(error);
              });
          });
      });
  });
  it('A user should not get the details of other user',(done)=>{
    const agent = chai.request.agent(server);
    agent.post('/login').send(userlogin).then(res=>{
      agent.get('/getallusers').then(response=>{
        response.should.have.status(403)
        response.body.should.have.property('message')
        done()
      })
    })
    
  })
});
