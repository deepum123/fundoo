/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : editTitle.js
 * @overview  : test the api with possitive and negative sinarious
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 01-07-2019
 *
 *************************************************************************************/


var chai = require('chai')
var chaihttp = require('chai-http')
var expect = chai.expect
chai.use(chaihttp)
chai.should()
var server = require('../server')
var fs = require("fs")

/**************************************************************************************
* @description: to read file from json
***************************************************************************************/

function readfile() {
  var readdata = fs.readFileSync('/home/admin1/Desktop/fundoo/ServerSide/test/test.json')
  var data = JSON.parse(readdata)
  return data
}

/***************************************************************************************
* @description: test for edit Title of note
****************************************************************************************/
describe("test status of editTitle api", function () {
  it("its check http 200 status", function (done) {
    var jsonData = readfile()
    chai.request(server)
      .post('/editTitle')
      .send(jsonData.editTitle)
      .set('_id', jsonData.editTitle._id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done()
      })
  })
  it("its check http 422 error status", function (done) {
    var jsonData = readfile()
    chai.request(server)
      .post('/editTitle')
      .send(jsonData.editTitle2)
      .set('_id', jsonData.editTitle._id)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done()
      })
  })
  it("its check http 400 error status", function (done) {
    var jsonData = readfile()
    chai.request(server)
      .post('/editTitle')
      .send(jsonData.editTitle3)
      .set('_id', jsonData.editTitle._id)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done()
      })
  })

})
