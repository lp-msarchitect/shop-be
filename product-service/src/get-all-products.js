import { Client } from 'pg';
import productList from './products.json';

const { PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

export const getAllProducts = async (event) => {
  let statusCode = 200;
  let responseBody;

  const client = new Client(dbOptions);
  try {
    await client.connect();
    console.log('Connected!');
    const { rows } = await client.query(
      `select p.id, p.title, p.description, p.price, s.count from products p
      inner join stocks s on p.id  = s.product_id `
    );
    console.log(rows);

    responseBody = JSON.stringify(rows);
  }
  catch (err) {
    console.log(err);
    statusCode = 500;
    responseBody = 'Internal server error';
  }
  finally {
    client.end();

    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      body: responseBody
    };
  }
};