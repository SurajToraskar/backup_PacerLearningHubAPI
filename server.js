require('./Configuration/mongodbConfig/config.js');
const express=require('express');
const fileUpload = require('express-fileupload'); 
const assignmentRoute=require('./routes/assignment.routes.js');
const subRoute=require("./routes/subject.routes.js");
const qpaperRoute=require('./routes/qpaper.routes.js');
const notesRoute=require('./routes/notes.routes.js');
const deptRoute=require("./routes/department.routes.js");
const noticeRoute=require("./routes/notice.routes.js");
const profileRoute=require('./routes/teacherProfile.routes.js');
const feedbackRoute=require("./routes/feedback.routes.js");
const studentProfileRoute=require("./routes/studentProfile.routes.js");
const timetableRoute=require("./routes/timetable.routes.js")
const resultRoute=require("./routes/result.routes.js");
const port=8000;
const app=express();

app.use(fileUpload({
    useTempFiles: true
}));


app.use(express.json());

app.use('/assignment',assignmentRoute);
app.use('/teacherProfile',profileRoute);
app.use('/studentProfile',studentProfileRoute);
app.use('/qpaper',qpaperRoute);
app.use('/notes',notesRoute);
app.use('/dept',deptRoute);
app.use('/subject',subRoute);
app.use('/notice',noticeRoute);
app.use('/feedback',feedbackRoute);
app.use('/result',resultRoute);
app.use('/timetable',timetableRoute);


app.listen(port,()=>{console.log(`Listening to port ${port} `)})