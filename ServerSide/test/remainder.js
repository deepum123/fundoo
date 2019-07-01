/************************************************************************************
 * @purpose   : testing the perticular api  using mocha and chai
 *
 * @file      : remainder.js
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
* @description: test for remainder
****************************************************************************************/
describe("test status of remainder api", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/remainder')
        .send(jsonData.remainder)
        .then((res) => {
            console.log("$$$$$$$$$$$$$$",res.body)
         expect(res).to.have.status(200);
         expect(res.body.data.remainder).to.be.equal("2 o clock")
         expect(res.body.data.remainder).to.be.equal("1 o clock")
         done()
        }).catch(err => {
            console.log(err.message);
        })
    })

})
