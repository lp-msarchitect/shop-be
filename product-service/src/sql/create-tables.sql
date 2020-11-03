create table products (
	id uuid primary key default uuid_generate_v4(),
   title text not null,
   description text,
   price integer
)

create table stocks (
	"count" integer,
	product_id uuid,
	foreign key ("product_id") references "products" ("id")
)

insert into products (title, description, price) values
	('My_Product_1', 'My awsome product number 1', 100),
	('My_Product_2', 'My awsome product number 2', 10),
	('My_Product_3', 'My awsome product number 3', 20),
	('My_Product_4', 'My awsome product number 4', 13),
	('My_Product_5', 'My awsome product number 5', 55),
	('My_Product_6', 'My awsome product number 6', 57),
	('My_Product_7', 'My awsome product number 7', 150)

insert into stocks (product_id, "count") values
	('50c36780-b33c-4b9c-93bd-46f3b9b3f5cb', 10),
	('9294e1c7-2296-4aa3-b151-91c9cb4bb3f0', 1),
	('156b93a6-310c-4880-968f-02578c882c0e', 0),
	('51dd0576-f57b-481e-93ec-19dd8188405a', 2),
	('7b279ba7-1956-49e5-93bc-65851a1aea8a', 5),
	('bcddbd42-7e6f-4cce-96d5-0b7be0d28d29', 9),
	('f8de8182-806c-4fd4-83ff-9bf8dbf75e88', 1)
	
	
create extension if not exists "uuid-ossp";