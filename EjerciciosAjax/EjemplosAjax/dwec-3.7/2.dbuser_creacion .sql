CREATE USER 'ajax'@'localhost' IDENTIFIED BY 'dbpass';

GRANT ALL PRIVILEGES ON ajax.* TO 'ajax'@'localhost';

FLUSH PRIVILEGES;
