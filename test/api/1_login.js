const { expect } = require('chai')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../../index')

chai.should()

chai.use(chaiHttp)

describe('Test Login',()=>{
    it('Should be able login user with correct credentials',(done)=>{
        const userDetails={
            username:'user@gmail.com',
            password:'123456'
        }
        chai.request(server)
            .post('/login')
            .send(userDetails)
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('message')
            done();
            })
    })
    it('Should not login user with wrong credentials',(done)=>{
        const userDetails={
            username:'user@gmail.com',
            password:'12345'
        }
        chai.request(server)
            .post('/login')
            .send(userDetails)
            .end((err,response)=>{
                response.should.have.status(401)
                response.error.text.should.equals('Unauthorized')
            done();
            })
    })
})