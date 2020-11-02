import productList from './products.json';

export const getProductById = async (event) => {
  try {
    console.log('Lambda invocation with event: ', event);
    const { productId } = event.pathParameters;

    const product = productList.find(el => el.id === productId);

    const statusCode = product ? 200 : 404
    const body = product ? JSON.stringify(product) : `Product with id ${productId} not found`  

    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      body: body,
    };
  }catch(err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      body: 'Internal server error'
    };
  }
};