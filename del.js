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
app.get('/delete',function(req,res){
res.sendFile(path.join(__dirname+'/delete.html'));
});
app.get('delete-submit',function(req,res){
res.sendFile(path.join(__dirname+'/delete.html'));
});
app.post('/delete-submit',function(req,res){
console.log(req.body.email);
console.log("Deleting.......");
db.connect((err)=>{
if(err) throw err;
console.log('connected to database');
var sql="DELETE FROM joinugc.applicants WHERE applicant_email ='"+req.body.email+"' AND "+"applicant_mobilenumber='"+req.body.mobile+"'";
db.query(sql,function(err,data,fields){
 if (err) throw err;
    console.log(data);
    http.createServer(function(req1, res1){
    res1.write('<html><head></head><body style="text-align:center;background-color:plum;font-size:30px"><h1>your record is deleted</h1>');
    res1.end('</body></html>')
    }). listen(9000);
});
console.log('Deleted');
});
res.redirect('http://localhost:9000');
res.end();
});
app.listen(8080);
console.log('running at port 8080');