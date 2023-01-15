#!/bin/bash

mariadb -u root -e "CREATE USER 'test'"
mariadb -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'test'@'%'"
mariadb -u root -e "FLUSH PRIVILEGES"
mariadb -u root -e "CREATE DATABASE testdb"
mariadb -u root testdb -e "CREATE TABLE test ( id int auto_increment primary key, name varchar(128) charset utf8 )"
mariadb -u root testdb -e "INSERT INTO test VALUES (1, 'whatever'),(2, 'something else')"
