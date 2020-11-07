select p.id, p.title, p.description, p.price, s.count from products p
inner join stocks s on p.id  = s.product_id 