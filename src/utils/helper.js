import AWS from "aws-sdk";
import config from '../config/config.json'

// S3 Credentials
AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

const handleImageDelete = async (imageName) => {
    const s3 = new AWS.S3();
    const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: imageName
    };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Object deleted successfully');
    })
}

// Function to upload file to s3
const handleImageUpload = async (file) => {
    const s3 = new AWS.S3({
        params: { Bucket: config.S3_BUCKET_NAME },
        region: config.REGION,
    });

    // Files Parameters
    const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: file.name,
        Body: file,
    };

    // Uploading file to s3
    const upload = s3.putObject(params)
    .on("httpUploadProgress", (evt) => {
        console.log("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
    }).promise();

    try {
        const resp = await upload;
        console.log(resp,'resp');
        window.location.reload(false)
    } catch (error) {
        console.log(error);
    }
};

export {
    handleImageDelete,
    handleImageUpload
}