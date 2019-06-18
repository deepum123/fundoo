/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : user.controller.js
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
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server).post('/register').send(jsonData.register).then((res) => {
          // var tok = res.body.token.token
            expect(res).to.have.status(200);
            expect(res.body.message.firstname).to.be.equal("deepum");
            expect(res.body.message.lastname).to.be.equal("kumar");
           
            done()
        }).catch(err => {
            console.log(err.message);
        })
    })

})
