create database tauchi_app CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON tauchi_app.* To 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON tauchi_app.* To 'root'@'%' IDENTIFIED BY 'root';
flush privileges;
