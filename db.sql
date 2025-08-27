CREATE table users(userid int auto_increment, fullname VARCHAR(100),email VARCHAR(100),password VARCHAR(255),primary key(userid));

create table post(postid int auto_increment,content TEXT,createdat DATETIME default CURRENT_TIMESTAMP(),
postowner int, primary key(postid), foreign key(postowner)references users(userid)); 


INSERT INTO users (fullname, email, password) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'alice123'),
('Michael Smith', 'michael.smith@example.com', 'mike123'),
('Sophia Brown', 'sophia.brown@example.com', 'sophia123'),
('Daniel Williams', 'daniel.williams@example.com', 'daniel123'),
('Emma Davis', 'emma.davis@example.com', 'emma123'),
('James Miller', 'james.miller@example.com', 'james123'),
('Olivia Wilson', 'olivia.wilson@example.com', 'olivia123'),
('Benjamin Moore', 'benjamin.moore@example.com', 'ben123'),
('Isabella Taylor', 'isabella.taylor@example.com', 'bella123'),
('Ethan Anderson', 'ethan.anderson@example.com', 'ethan123'),
('Mia Thomas', 'mia.thomas@example.com', 'mia123'),
('Alexander Jackson', 'alexander.jackson@example.com', 'alex123'),
('Charlotte White', 'charlotte.white@example.com', 'charlotte123'),
('Henry Harris', 'henry.harris@example.com', 'henry123'),
('Amelia Martin', 'amelia.martin@example.com', 'amelia123'),
('Lucas Thompson', 'lucas.thompson@example.com', 'lucas123'),
('Harper Garcia', 'harper.garcia@example.com', 'harper123'),
('William Martinez', 'william.martinez@example.com', 'will123'),
('Evelyn Robinson', 'evelyn.robinson@example.com', 'evelyn123'),
('Matthew Clark', 'matthew.clark@example.com', 'matt123');

show tables;