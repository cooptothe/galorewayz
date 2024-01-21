import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/getProducts', async (req, res) => {
  console.log('Request received at /getProducts');
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
                  productType
                  description
                  handle
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

app.get('/getProducts/:productType', async (req, res) => {
  const { productType } = req.params;
  console.log(`Request received at /getProducts for product type: ${productType}`);

  try {
    const response = await fetch('https://galorewayzlifestyle.com/api/2023-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '5fabebbde54d675f57255be67d7f17da',
      },
      body: JSON.stringify({
        query: `
          query getProducts($productType: String!) {
            products(first: 10, query: $productType) {
              edges {
                node {
                  id
                  title
                  productType
                  description
                  handle
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
        variables: {
          productType,
        },
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getProductByHandle/:handle', async (req, res) => {
  const { handle } = req.params;
  console.log(`Request received at /getProductByHandle for handle: ${handle}`);

  try {
    const response = await fetch('https://galorewayzlifestyle.com/api/2023-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '5fabebbde54d675f57255be67d7f17da',
      },
      body: JSON.stringify({
        query: `
        query getProductByHandle($handle: String!) {
          product(handle: $handle) {
            id
            title
            description
            productType
            handle
                    media(first: 10) {
                edges {
                  node {
                    previewImage {
                      url
                    }
                  }
                }
              }
            variants(first: 5) {
              edges {
                cursor
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }        
        `,
        variables: {
          handle,
        },
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
