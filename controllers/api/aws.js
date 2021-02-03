const aws = require("aws-sdk");
const fs = require("fs");
const uniqid = require("uniqid");

module.exports = {
    createNewAvatar,
    deleteAvatar,
};

const BUCKET_NAME = process.env.BUCKET_NAME;

aws.config.setPromisesDependency();
aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    //   region: process.env.REGION
});

const s3 = new aws.S3();

function createNewAvatar(avatarPath) {
    const avatarId = uniqid();
    var params = {
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Body: fs.createReadStream(avatarPath),
        Key: `profileAvatar/${avatarId}`,
    };

    return S3Upload(params);
}

function deleteAvatar(avatarId) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: avatarId,
    };
    s3.deleteObject(params, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.log(data, ' Avatar deleted successfully! This is the response from s3.deleteObject()')
        }
    });
}

function S3Upload(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(
                    "Error occured while trying to upload to S3 bucket",
                    err
                );
                reject(err);
            } else {
                console.log(data, " s3.upload() response data");
                resolve(data);
                // fs.unlinkSync(req.file.path); // Empty temp folder
                // const locationUrl = data.Location;
                // const profile = Profile.findById(req.params.profileId)
                //     // { ...req.body, avatar: locationUrl };
                //     profile.avatar = locationUrl;
                //     profile
                //     .save()
                //     .then((profile) => {
                //         res.json({ message: "Profile Avatar uploaded successfully", profile });
                //     })
                //     .catch((err) => {
                //         console.log("Error occured while trying to save to DB");
                //     });
            }
        });
    });
}
