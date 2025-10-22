-- Create the database
CREATE DATABASE IF NOT EXISTS coffee_shop_db;

-- Use the database
USE coffee_shop_db;

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Insert initial menu data
INSERT INTO menu_items (name, description, price, image) VALUES
('Espresso', 'Strong and bold coffee shot', 3.50, 'espresso.jpg'),
('Latte', 'Smooth espresso with steamed milk', 4.50, 'latte.jpg'),
('Cappuccino', 'Espresso with steamed milk and foam', 4.00, 'cappuccino.jpg'),
('Mocha', 'Chocolate-flavored coffee with milk', 5.00, 'mocha.jpg');
