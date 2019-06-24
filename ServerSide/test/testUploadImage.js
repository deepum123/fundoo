/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : testUploadImage.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 24.06.2019
 *
 *************************************************************************************/

var server = require('../server')

var chai = require('chai')
var chaihttp = require('chai-http')
chai.use(chaihttp)
var expect = chai.expect;
var should = chai.should()
var fs = require('fs')

/**************************************************************************************
* @description: to read file from json
***************************************************************************************/
function readfile() {
    var readdata = fs.readFileSync('/home/admin1/Desktop/fundoo/ServerSide/test/test.json')
    var data = JSON.parse(readdata)
    return data

}


/*************************************************************************************
* @description:test script for UploadImage
************************************************************************************/

describe("mocha and chai test case", function () {
    it("test cases for upload image", function (done) {
        this.timeout(1000000)
        var data = readfile()
        chai.request('http://localhost:3000')
            .post('/uploadImage')
            .type('form')
            .attach('image', '/home/admin1/Pictures/Wallpapers/pexels-photo-236047.jpeg', 'test.png')
            .set('token', data.token)
            .then((res) => {
                console.log(JSON.stringify(res));
                expect(res).to.have.status(200);
                console.log("333",res.body)
                
                expect(res.body.message.firstname).to.be.equal("dyrfthf");
                expect(res.body.message.lastname). to.be.equal("kugvng");
                expect(res.body.message.email).to.be.equal("raddrgdrf@gmail.com");
                done();
            }).catch(err => {
                console.log(err.message);
            });

    })




})