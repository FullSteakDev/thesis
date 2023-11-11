-- cat database.sql | heroku pg:psql -a <heroku-app-name> (command that copies all datas from this file to the heroku addon)

-- customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- management table
CREATE TABLE management (
    manager_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
);

-- emlployees table
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    hire_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    employee_level VARCHAR(255),
    image VARCHAR(255),
    manager_relation INT
);

-- projects that employees can see and partially modify, managers can create, delete and modify
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  employee_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300),
  deadline VARCHAR(100),
  manager_relation INT
);

-- propeerties that managers can create, read, modify, delete
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    state VARCHAR(30),
    amortisation INT,
    age INT,
    role INT -- 1: tools, 2: equipments, 3: vehicles
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    description VARCHAR(255),
    price INT,
    material VARCHAR(255)
);

CREATE TABLE travels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    departure VARCHAR(255),
    destination VARCHAR(255),
    date VARCHAR(255),
    price INT,
    length INT
);

CREATE TABLE customer_products (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    name VARCHAR(30),
    description VARCHAR(255),
    price INT,
    material VARCHAR(255)
);

CREATE TABLE customer_travels (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    name VARCHAR(30),
    departure VARCHAR(255),
    destination VARCHAR(255),
    date VARCHAR(255),
    price INT,
    length INT
);