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

describe("test cases for labels", function () {
    it("its check http 200 status", function (done) {
        chai.request(server).post('/editlabelname').send(data.editLabelName).set('_id', data.editLabelName._id).end((err, res) => {
            expect(res).to.have.status(200);
            done()
        })
    })
    it("its check http 422 error status", function (done) {
        chai.request(server).post('/editlabelname').send(data.editLabelName2).set('_id', data.editLabelName._id).end((err, res) => {
            expect(res).to.have.status(422);
            done()
        })
    })
    it("its check http 404 error status", function (done) {
        chai.request(server).post('/editlabelname').send(data.editLabelName3).set('_id', data.editLabelName._id).end((err, res) => {
            expect(res).to.have.status(404);
            done()
        })
    })

})