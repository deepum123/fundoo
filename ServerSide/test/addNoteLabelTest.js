
/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : addNoteLabel.js
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
console.log("RRRRR", data)

describe("add note to label test cases", function () {
    it("its check success status", function (done) {
        chai.request(server).post('/addnotetolabel').send(data.addNoteToLabel).set('_id', data.addNoteToLabel._id).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done()
        })
    })
    it("its check http 404 error status", function (done) {
        chai.request(server).post('/addnotetolabel').send(data.addNoteToLabel2).set('_id', data.addNoteToLabel._id).end((err, res) => {
            expect(res).to.have.status(404);
            done()
        })
    })
    it("its check http 422 error status", function (done) {
        chai.request(server).post('/addnotetolabel').send(data.addNoteToLabel3).set('_id', data.addNoteToLabel._id).end((err, res) => {
            expect(res).to.have.status(422);
            done()
        })
    })


})