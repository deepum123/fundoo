/************************************************************************************
 * @purpose   : Image result for about aws s3 node js

 * 
 * @file      : s3ApiServices.js
 * @overview  : Using AWS S3 Buckets in a NodeJS App. AWS S3 is a simple storage service offered by Amazon AWS that give you the ability to use it as a webservice

 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 24.06.2019
 * 
 *************************************************************************************/







require('dotenv').config();

var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')


console.log("AccessKeyID", process.env.AccessKeyID);
console.log("SecretAccessKey", process.env.SecretAccessKey);

var s3 = new aws.S3()
class awsService {
  constructor(a, b, c) {
    s3.config.update({
      secretAccessKey: a,
      accessKeyId: b,
      region: c
    })
  }
  fileFilterImage() {
    const fileFilter = function (req, file, callback) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
      }
      else {
        callback(new Error('invalid mime type '), false)
      }
    }
    return fileFilter
  }

  upload() {
    let fileFilter = this.fileFilterImage()
    var upload = multer({
      fileFilter,
      storage: multerS3({
        s3: s3,
        bucket: 'fundoo-pic-123',
        acl: 'public-read',
        metadata: function (_req, file, callback) {
          callback(null, file);
        },
        key: function (_req, _file, callback) {
          callback(null, Date.now().toString())
        }
      })
    })
    console.log("rewached upload")
    return upload;
  }
}
let awsObj1 = new awsService(process.env.SecretAccessKey, process.env.AccessKeyID, process.env.region
)
module.exports = awsObj1.upload()
