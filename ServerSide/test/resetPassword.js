/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : user.controller.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 17.06.2019
 *
 *************************************************************************************/




var chai=require('chai')
var expect=chai.expect
var chaihttp=require('chai-http')
chai.use(chaihttp)
var server=require('../server')
var fs=require('fs')
/**************************************************************************************
* @description: to read file from json
***************************************************************************************/
function readfile(){
    var readdata=fs.readFileSync('/home/admin1/Desktop/fundoo/ServerSide/test/test.json')
    var data=JSON.parse(readdata)
    return data
}

 /******************************************************************************************
 * @description:test script for forgot and reset password
 *****************************************************************************************/
describe("test status of login api",function(){
    it("its check http 200 status",function(done){
        var jsonData=readfile()
        chai.request(server).post('/resetpassword/:token').send(jsonData.resetpassword).set('_id',jsonData.resetpassword._id).end((err, res) => {     
          expect(res).to.have.status(200);
      done()
    })
    })
    it("its check http 422 error status",function(done){
      var jsonData=readfile()
      chai.request(server).post('/resetpassword/:token').send(jsonData.resetpassword2).set('_id',jsonData.resetpassword._id).end((err, res) => {     
        expect(res).to.have.status(422);
    done()
  })
  })
  })
