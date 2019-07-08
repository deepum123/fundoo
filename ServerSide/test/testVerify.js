/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : testVerify.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 24.06.2019
 *
 *************************************************************************************/





var chai = require('chai')
var expect = chai.expect
var chaihttp = require('chai-http')
chai.use(chaihttp)
var server = require('../server')
var fs = require('fs')

/**************************************************************************************
* @description: to read file from json
***************************************************************************************/
function readfile() {
  var readdata = fs.readFileSync('/home/admin1/Desktop/fundoo/ServerSide/test/test.json')
  var data = JSON.parse(readdata)
  return data
}

/*************************************************************************************
* @description:test script for verifyEmail
************************************************************************************/

describe("test status of login api", function () {
  it("Should return 200 and confirmation for valid input", function (done) {
    var jsonData = readfile()
    chai.request(server).post('/verification/:token').send(jsonData.verify).set('_id',jsonData.verify._id).end((err, res) => {     
      expect(res).to.have.status(200);
      done()
  })
  })
  })