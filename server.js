import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/getProducts', async (req, res) => {
  try {
    const response = await fetch('https://galorewayzlifestyle.com/api/2023-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '5fabebbde54d675f57255be67d7f17da',
      },
      body: JSON.stringify({
        query: `
          query getProducts {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  description
                  media(first: 1) {
                    edges {
                      node {
                        previewImage {
                          url
                        }
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
