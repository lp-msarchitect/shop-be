import { getClient } from './modules/bdService';

export const postProduct = async (event) => {
    let statusCode;
    let responseBody;
    const { title, description = '', price, count } = event.body;
    console.log('request body: ', event.body);
    const client = getClient();
    try {
        await client.connect();
        console.log('Connected!');
        await client.query('BEGIN');
        const queryText = 'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id';
        const res = await client.query(queryText, [title, description, price]);
        const insertStockText = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)'
        const insertStockValues = [res.rows[0].id, count];
        await client.query(insertStockText, insertStockValues)
        await client.query('COMMIT')
        statusCode = 200;
        responseBody = JSON.stringify({ id: res.rows[0].id, title, description, price, count });
    } catch (err) {
        console.log(err);
        await client.query('ROLLBACK');
        statusCode = 500;
        responseBody = 'Internal server error';
    } finally {
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
}