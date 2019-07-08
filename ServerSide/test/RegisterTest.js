/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : RegisterTest.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 17.06.2019
 *
 *************************************************************************************/


var chai = require('chai')
var charhttp = require('chai-http')
var expect = chai.expect
chai.use(charhttp)
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
* @description: test for user register
****************************************************************************************/
describe("test status of register api", function () {
    it("its check http 200 status", function (done) {
        var jsonData = readfile()
        chai.request(server).post('/register').send(jsonData.register).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done()
        })
    })
    it("its check http 422 error status", function (done) {
        var jsonData = readfile()
        chai.request(server).post('/register').send(jsonData.register2).end((err, res) => {
            expect(res).to.have.status(422);
            done()
        })
    })
    it("its check http 404 error status", function (done) {
        var jsonData = readfile()
        chai.request(server).post('/register').send(jsonData.register3).end((err, res) => {
            expect(res).to.have.status(404);
            done()
        })
    })
})

