DELIMITER $$

CREATE TRIGGER reduce_stock_after_order
AFTER INSERT ON OrderDetails
FOR EACH ROW
BEGIN
  UPDATE Product
  SET stock = stock - NEW.quantity
  WHERE product_id = NEW.product_id;
END $$

DELIMITER ;