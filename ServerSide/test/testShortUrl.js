/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : testShortUrl.js
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
* @description:test script for shortUrl
************************************************************************************/

describe("test status of login api", function () {
  it("Should return 200 and confirmation for valid input", function (done) {
    var jsonData = readfile()
    chai.request(server).post('/:code').send(jsonData.shorturl).then((res) => {
      expect(res).to.have.status(200);
      // console.log("sss",res.body)
      expect(res.body[0].originalUrl).to.be.equal("http://localhost:3000/emailverification");
      expect(res.body[0].email).to.be.equal("raddrgrf@gmail.com");

      done();
    }).catch(err => {
      console.log(err.message);
    })
  })


})