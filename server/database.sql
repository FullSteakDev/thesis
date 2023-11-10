-- customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT DEFAULT 1
);

-- management table
CREATE TABLE management (
    manager_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone_number VARCHAR(20),
    department VARCHAR(255),
    office_location VARCHAR(255),
    start_date DATE,
    role_id INT DEFAULT 3
);

-- emlployees table
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    hire_date DATE,
    job_title VARCHAR(255),
    manager_relation INT
);

-- projects that employees can see and partially modify, managers can create, delete and modify
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  employee_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300),
  deadline VARCHAR(100)
);

-- propeerties that managers can create, read, modify, delete
CREATE TABLE properties {
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    state VARCHAR(30),
    amortisation INT,
    age TINYINT,
    role INT -- 1: tools, 2: equipments, 3: vehicles
};

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