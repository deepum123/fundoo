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




var fs = require('fs');


var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var path = require('path');
console.log("AccessKeyID", process.env.AccessKeyID);
console.log("SecretAccessKey", process.env.SecretAccessKey);

var s3 = new aws.S3()
class awsService {
  constructor(secretAccessKey, accessKeyId, region) {
    s3.config.update({
      secretAccessKey: secretAccessKey,
      accessKeyId: accessKeyId,
      region: region
    })
  }

  
  //create S3 bucket function 
  createBucket(req, res) {
    var bucketParams = {
      Bucket: 'sample-bucket123456025022235',
      ACL: 'public-read'
    };
    // Call S3 to obtain a list of the objects in the bucket
    // call S3 to create the bucket
    s3.createBucket(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
        return res.send({
          success: true,
          message: "list of object of s3 Api",
          data: data.Location
        })
      }
    })
  }


  //list out the buckets of S3 
  listOfBuckets(req, res) {

    s3.listBuckets(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Buckets);
        return res.send({
          success: true,
          message: "list of object of s3 Api",
          data: data.Buckets
        })
      }
    });
  }


  //list out the object contains in s3 buccket
  listOfObject(req, res) {
    /*
      var bucketParams = {
        Bucket : 'sample-bucket12345602502223',
      };
      */
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(req.body.bucketname, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success123", data);
        return res.send({
          success: true,
          message: "list of object of s3 Api",
          data: data
        })
      }
    });
  }



  //delete the perticular bucket in s3 
  deleteS3bucket(req, res) {
    // var bucketParams = {
    //   Bucket : 'BUCKET_NAME'
    // };

    // Call S3 to delete the bucket
    s3.deleteBucket(req.body.bucketname, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        return res.send({
          success: true,
          message: "list of object of s3 Api",
          data: data
        })
      }
    });
  }


  //upload the image to s3 bucket
  upload(req, res, next) {
    console.log("hiii", req.file)

    var params = {
      Bucket: 'fundoo-pic-123',
      Key: Date.now().toString(),
      Body: req.file.buffer,
      ACL: 'public-read'
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error uploading image: ", err);
        res.status(500).send({
          success: false,
          message: "Error uploading image",
          err: err
        })
      } else {
        console.log("uploading image successfully", data);
        req.location = data.Location
        next()

      }
    });
  }
  // upload() {
  //   let fileFilter = this.fileFilterImage()
  //   var upload = multer({
  //     fileFilter,
  //     storage: multerS3({
  //       s3: s3,
  //       bucket: 'fundoo-pic-123',
  //       acl: 'public-read',
  //       metadata: function (_req, file, callback) {
  //         callback(null, file);
  //       },
  //       key: function (_req, _file, callback) {
  //         callback(null, Date.now().toString())
  //       }
  //     })
  //   })
  // console.log("rewached upload")
  //   return upload;
  // }
}
let awsObj1 = new awsService(process.env.SecretAccessKey, process.env.AccessKeyID, process.env.region
)
module.exports = awsObj1
