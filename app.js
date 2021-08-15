const express=require('express');
var app=express();
var http=require('http');
var path=require('path');
const mysql=require('mysql');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const db=mysql.createConnection({
host:'localhost',
user:'root',
password:'Suryastar1@',
port:3306,
database:'joinugc'
});
app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('js'));
app.get('/',function(req,res){
res.sendFile(path.join(__dirname+'/colleges.html'));
});
app.post('/submit',function(req,res){
console.log(req.body.firstname);
var firstname=req.body.firstname;
var lastname=req.body.lastname;
var email=req.body.Email;
var phone=req.body.mobilenumber;
var birth=req.body.dob;
var time=req.body.time;
var files=req.body.studentphoto;
var ip=req.body.ip;
db.connect((err)=>{
if(err) throw err;
console.log('connected to database created table');
var sql="INSERT INTO joinugc.applicants(applicant_firstname,applicant_lastname,applicant_email,applicant_mobilenumber,applicant_dob,applicant_time,applicant_studentphoto,applicant_ip) VALUES('"+firstname+"','"+lastname+"','"+email+"','"+phone+"','"+birth+"','"+time+"','"+files+"','"+ip+"')";
db.query(sql,(err,result)=>{
if(err) throw err;
console.log('done');
});
});
res.redirect('http://localhost:8080');
res.end();
})
app.listen(8080);
console.log("running at port 8080");

app.get('/sub',function(req,res){
res.sendFile(path.join(__dirname+'/update.html'));
});
app.get('/update-submit',function(req,res){
res.sendFile(path.join(__dirname+'/update.html'));
});
app.post('/update-submit',function(req,res){
console.log(req.body.uname);
console.log("updating.......");
db.connect((err)=>{
if(err) throw err;
console.log('connected to database');
var sqlup="select * from joinugc.applicants where applicant_firstname='"+req.body.uname+"' AND "+"applicant_lastname='"+req.body.lname+"' AND "+"applicant_mobilenumber="+req.body.mobile;
db.query(sqlup,function(err,data,fields){
if(err) throw err;
http.createServer(function(req1,res1){
res1.write('<html><head></head><body>');
res1.write('<p><table border style><tr><th>applicant_id</th><th>applicant_firstname</th><th>applicant_lastname</th><th>applicant_email</th><th>applicant_mobilenumber</th><th>applicant_dob</th><th>applicant_time</th><th>applicant_studentphoto</th><th>applicant_ip</th></tr><tr><td>'+data[0].applicant_id+'</td><td>'+data[0].applicant_firstname+'</td><td>'+data[0].applicant_lastname+'</td><td>'+data[0].applicant_email+'</td><td>'+data[0].applicant_mobilenumber+'</td><td>'+data[0].applicant_dob+'</td><td>'+data[0].applicant_time+'</td><td>'+data[0].applicant_studentphoto+'</td><td>'+data[0].applicant_ip+'</td></tr></table></p>');
res1.end('</body></html>');
}).listen(9000);
console.log(data);
});
console.log('done');
});
res.redirect('http://localhost:9000');
//res.redirect('career.html');
res.end();
});

