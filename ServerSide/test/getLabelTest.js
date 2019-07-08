/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : getLabelTest.js
 * @overview  : test the api with possitive and negative sinarious
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 08-07-2019
 *
 *************************************************************************************/





let chai = require('chai')
let chaihttp = require('chai-http')
chai.use(chaihttp)
var server = require('../server')
let expect = chai.expect
const fs = require('fs')

function readfile() {
    var data = fs.readFileSync('/home/admin1/Desktop/fundoo/ServerSide/test/test.json')
    const data2 = JSON.parse(data)
    return data2
}
var data = readfile()
describe("test cases for labels", function () {
    it("its check http 200 status", function (done) {
        chai.request(server).post('/getlabels').send(data.getlabels).set('_id', data.getlabels._id).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done()
        })
    })
    it("its check http 404 error status", function (done) {
        chai.request(server).post('/getlabels').send(data.getlabels2).set('_id', data.getlabels._id).end((err, res) => {
            expect(res).to.have.status(404);
            done()
        })
    })
    it("its check http 200 status", function (done) {
        chai.request(server).post('/getlabels').send(data.getlabels2).set('_id', data.getlabels._id).end((err, res) => {
            expect(res).to.have.status(200);
            done()
        })
    })
})