let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');

chai.should();

chai.use(chaiHttp);

describe('Admin featues', () => {
  const adminLogin = {
    username: 'admin@gmail.com',
    password: '123456',
  };
  let loanApplicationId
  it('Able see all loan application post by agent', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(adminLogin)
      .then((res) => {
        agent.get('/admin/').then((response) => {
          response.should.have.status(200);
          response.body.should.have.a('array');
          console.log()
          loanApplicationId=response.body[0]._id
          done()
        });
      })
      .catch((response) => {
        done(response);
      });
  });
  it('Able to approve or reject loan application', (done) => {
    const agent = chai.request.agent(server);
    // if value of loanApproved is true loan will be approved else will be rejected
    const body={loanApproved:true}
    agent
      .post('/login')
      .send(adminLogin)
      .then((res) => {
        agent.put(`/admin/${loanApplicationId}`).send(body).then((response) => {
          response.should.have.status(200);
          response.body.should.have.property('message');
          done()
        })
        .catch((error)=>{
            console.log(error)
            done(error)
        })
      })
      .catch((response) => {
        done(response);
      });
  });

});
