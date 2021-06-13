const { expect } = require('chai')
let chai = require('chai')
let chaiHttp = require('chai-http')
const { response } = require('express')
let server = require('../../index')
const agentRouter = require('../../routes/agent/agentRouter')

chai.should()

chai.use(chaiHttp)

describe('Checking permissions',()=>{
    it('A user should not get the details of other users',(done)=>{
        const userDetails={
            username:'user@gmail.com',
            password:'123456'
        }
        const agent=chai.request.agent(server)
        agent
            .post('/login')
            .send(userDetails)
            .then((res)=>{
                expect(res).to.have.cookie('express:sess')
                agent.get('/getallusers')
                .then((response)=>{
                    response.should.have.status(401)
                    response.body.should.have.property('message')
                    done()
                })
            })
            .catch(response=>{
                done(response)
            })
    })
})