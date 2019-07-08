/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : deleteNoteTest.js
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
    it("its check http 200 status", function (done) {
        var jsonData = readfile()
        chai.request(server)
            .post('/deleteNote')
            .send(jsonData.deleteNote)
            .set('_id', jsonData.deleteNote._id).end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
    })
    it("its check http 422 error status", function (done) {
        var jsonData = readfile()
        chai.request(server)
            .post('/deleteNote')
            .send(jsonData.deleteNote2)
            .set('_id', jsonData.login._id).end((err, res) => {
                expect(res).to.have.status(422);
                done()
            })
    })
    it("its check http 404 error status", function (done) {
        var jsonData = readfile()
        chai.request(server)
            .post('/deleteNote')
            .send(jsonData.deleteNote3)
            .set('_id', jsonData.login._id).end((err, res) => {
                expect(res).to.have.status(404);
                done()
            })
    })

})
