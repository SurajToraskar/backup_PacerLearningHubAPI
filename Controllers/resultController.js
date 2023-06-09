const cloudinary = require('../helpers/cloudinaryUpload.js');
const results=require("../Models/teacherModel/result.js")


exports.uploadResult = async (req, resp) => {
    const file = req.files.uploadresult;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new results({
            "title": req.body.title,
            "instruction": req.body.instruction,
            "teacher_id": req.body.teacher_id,
            "subject_id": req.body.subject_id,
            "file_path": result.url

        })
        console.log(result)
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}

exports.deleteResult = async (req, resp) => {
    const data = await results.findById(req.params.id);
    const imageUrl = data.file_path;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    results.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.viewResult = async (req, resp) => {
    const data = await results.findById(req.params.id).populate('teacher_id', ['name']).populate('subject_id', ['name']);
    const imagePath = data.file_path;
    resp.send(imagePath);
    console.log(data.teacher_id.name);
    console.log(data.subject_id.name);
}

exports.viewAllResult=async(req,resp)=>{
    const data=await results.find().populate('teacher_id', ['name']).populate('subject_id', ['name']);
    resp.send(data);
}
