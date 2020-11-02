import productList from './products.json';

export const getProductById = async (event) => {
  console.log('Lambda invocation with event: ', event);
  // const { productId } = event ....

  // Some logic ...
  // Don't forget about logging and testing

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
    },
    body: JSON.stringify(productList[0])
  };
};