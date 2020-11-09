import { getClient } from './modules/bdService';
import productList from './products.json';

export const getAllProducts = async (event) => {
  let statusCode = 200;
  let responseBody;
  console.log(`[${event.httpMethod}:] - [${event.path}] - [${event.pathParameters}]`);
  const client = getClient();
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