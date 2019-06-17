var chai=require('chai')
var expect=chai.expect
var chaihttp=require('chai-http')
chai.use(chaihttp)
var server=require('../server')
var fs=require('fs')
function readfile(){
    var readdata=fs.readFileSync('/home/admin1/Desktop/fundoo/ServerSide/test/test.json')
    var data=JSON.parse(readdata)
    return data
}

describe("test status of login api",function(){
    it("Should return 200 and confirmation for valid input",function(done){
        var jsonData=readfile()
        chai.request(server).post('/login').send(jsonData.login).then((res) => { 
            expect(res).to.have.status(200);  
            expect(res.body.message[0].firstname).to.be.equal("deepum");
            expect(res.body.message[0].lastname).to.be.equal("kumar");
 
            done();
          }).catch(err => {
            console.log(err.message);
          })
})


})