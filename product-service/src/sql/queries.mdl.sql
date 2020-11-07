select p.id, p.title, p.description, p.price, s.count from products p
inner join stocks s on p.id  = s.product_id 

select p.id, p.title, p.description, p.price, s.count 
from products p
inner join stocks s on p.id  = s.product_id
where p.id='50c36780-b33c-4b9c-93bd-46f3b9b3f5cb'
