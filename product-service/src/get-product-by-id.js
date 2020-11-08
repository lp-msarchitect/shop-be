import { getClient } from './modules/bdService';
import productList from './products.json';

export const getProductById = async (event) => {
  let statusCode;
  let responseBody;
  const { productId } = event.pathParameters;
  const client = getClient(); 
  try {
    await client.connect();
    console.log('Connected!');
    const {rows} = await client.query(
      `select p.id, p.title, p.description, p.price, s.count 
      from products p
      inner join stocks s on p.id  = s.product_id
      where p.id='${productId}'`
    );
    console.log('rows', rows);

    statusCode = rows[0] ? 200 : 404
    responseBody = rows[0] ? JSON.stringify(rows[0]) : `Product with id ${productId} not found`  
  }catch(err) {
    console.log(err);
    statusCode = 500;
    responseBody = 'Internal server error';
  }finally{
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