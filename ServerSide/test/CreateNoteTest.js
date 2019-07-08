/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : CreateNoteTest.js
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
* @description: test for createNote
****************************************************************************************/
describe("test status of createNote api", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
            .post('/createNote')
            .send(jsonData.createNote)
            .set('_id', jsonData.login._id).end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
    })
    it("its check http 422 error status", function (done) {
        var jsonData = readfile()
        chai.request(server)
            .post('/createNote')
            .send(jsonData.createNote2)
            .set('_id', jsonData.login._id).end((err, res) => {
                expect(res).to.have.status(422);
                done()
            })
    })
    it("its check http 200 status", function (done) {
        var jsonData = readfile()
        chai.request(server)
            .post('/createNote')
            .send(jsonData.createNote3)
            .set('_id', jsonData.login._id).end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
    })

})
