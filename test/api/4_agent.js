let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');

chai.should();

chai.use(chaiHttp);

describe('Agent featues', () => {
  const agentlogin = {
    username: 'agent@gmail.com',
    password: '123456',
  };
  let loanRequestId;
  let loanApplicationId;
  it('Able see all loan request put by USERS', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(agentlogin)
      .then((res) => {
        agent.get('/agent/loanRequests').then((response) => {
          response.should.have.status(200);
          response.body.should.have.a('array');
          loanRequestId = response.body[0]._id;
          done();
        });
      })
      .catch((response) => {
        done(response);
      });
  });

  it('Review the application post by USERS and apply for loan', (done) => {
    const body = { loanRequestId, rate: 5 };
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(agentlogin)
      .then((res) => {
        agent
          .post('/agent/appliedLoans')
          .send(body)
          .then((response) => {
            response.should.have.status(201);
            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((response) => {
        done(response);
      });
  });

  it('Edit loan application which are Not approved by admin', (done) => {
    const body = { interestRate: 10, period: 30 };
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(agentlogin)
      .then((res) => {
        agent
          .get('/agent/appliedLoans')
          .then((response) => {
            loanApplicationId = response.body[0]._id;
          })
          .then(() => {
            agent
              .put(`/agent/appliedLoans/${loanApplicationId}`)
              .send(body)
              .then((response) => {
                response.should.have.status(200);
                done();
              })
              .catch((err) => {
                console.log(err);
                done(err);
              });
          });
      })
      .catch((response) => {
        done(response);
      });
  });
});
