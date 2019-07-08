/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : getAllNotesTest.js
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
* @description: test for get all notes
****************************************************************************************/
describe("test status of get all notes api", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/getAllNotes')
        .send(jsonData.getAllNotes)
        .set('_id',jsonData.getAllNotes._id)
        .then((res) => {
            console.log("$$$$$$$$$$$$$$",res.body)
         expect(res).to.have.status(200);
         expect(res.body.data[0].color).to.be.equal("blue")
        expect(res.body.data[0].color).to.be.equal("red")
         done()
        }).catch(err => {
            console.log(err.message);
        })
    })

})
