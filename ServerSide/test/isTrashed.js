/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : isTrashed.js
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
* @description: test for isTrashed api
****************************************************************************************/
describe("test status of isTrashed api", function () {
    it("its check http 200 status", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/isTrashed')
        .send(jsonData.isTrashed)
        .set('_id',jsonData.isTrashed._id)
        .end((err, res) => {     
            expect(res).to.have.status(200);
        done()
      })
      })
      it("its check http 422 error status", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/isTrashed')
        .send(jsonData.isTrashed2)
        .set('_id',jsonData.isTrashed._id)
        .end((err, res) => {     
            expect(res).to.have.status(422);
        done()
      })
      })
      it("its check http 404 error status", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/isTrashed')
        .send(jsonData.isTrashed3)
        .set('_id',jsonData.isTrashed._id)
        .end((err, res) => {     
            expect(res).to.have.status(404);
        done()
      })
      })
})
