-- 1) Create the user if it doesn’t already exist
CREATE USER IF NOT EXISTS 'ecommerce_mysql_user'@'%';

-- 2) Grant privileges
GRANT ALL PRIVILEGES
  ON ecommerceproductsdatabase.*
  TO 'ecommerce_mysql_user'@'%';

FLUSH PRIVILEGES;
