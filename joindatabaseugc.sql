CREATE DATABASE if not exists joinugc;
CREATE TABLE joinugc.applicants(
applicant_id int not null auto_increment,
applicant_firstname varchar(50),
applicant_lastname varchar(50),
applicant_email varchar(100),
applicant_mobilenumber int,
applicant_dob varchar(100),
applicant_time varchar(100),
applicant_studentphoto varchar(1000),
PRIMARY KEY(applicant_id)
);
