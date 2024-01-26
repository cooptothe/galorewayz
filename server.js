import express from "express";
import cors from "cors";
import fetch from "node-fetch";


const app = express();
const port = 3001;



// Enable CORS for all routes
app.use(cors());

app.get("/getProducts", async (req, res) => {
  console.log("Request received at /getProducts");
  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "5fabebbde54d675f57255be67d7f17da",
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
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getProducts/:productType",
  async ({ params: { productType } }, res) => {
    console.log(
      `Request received at /getProducts for product type: ${productType}`
    );

    try {
      const response = await fetch(
        "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              "5fabebbde54d675f57255be67d7f17da",
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
        }
      );

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/getProductByHandle/:handle", async (req, res) => {
  const { handle } = req.params;
  console.log(`Request received at /getProductByHandle for handle: ${handle}`);

  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "5fabebbde54d675f57255be67d7f17da",
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
                    media(first: 100) {
                edges {
                  node {
                    previewImage {
                      url
                    }
                  }
                }
              }
            variants(first: 100) {
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
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/createCart", async (req, res) => {
  console.log("Request received at /createCart");

  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "5fabebbde54d675f57255be67d7f17da",
        },
        body: JSON.stringify({
          query: `
          mutation createCart {
            cartCreate {
              cart {
                id
                checkoutUrl
              }
            }
          }
        `,
          variables: {},
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getCart/:cartId", async (req, res) => {
  let { cartId } = req.params;
  
  console.log(`Request received at /getCart for cart ID: ${cartId}`);
  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "5fabebbde54d675f57255be67d7f17da",
        },
        body: JSON.stringify({
          query: `
          query getCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
        `,
          variables: {
            cartId,
          },
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateCartLines/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const { lines } = req.body;

  console.log(`Request received at /updateCartLines for cart ID: ${cartId}`);

  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "5fabebbde54d675f57255be67d7f17da",
        },
        body: JSON.stringify({
          query: `
          mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        `,
          variables: {
            cartId,
            lines,
          },
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error updating cart lines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/checkoutURL/:cartId", async (req, res) => {
  const { cartId } = req.params;

  console.log(`Request received at /checkoutURL for cart ID: ${cartId}`);

  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "5fabebbde54d675f57255be67d7f17da",
        },
        body: JSON.stringify({
          query: `
          query checkoutURL($cartId: ID!) {
            cart(id: $cartId) {
              checkoutUrl
            }
          }
        `,
          variables: {
            cartId,
          },
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching checkout URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/removeCartLines/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const { lineIds } = req.body;

  console.log(`Request received at /removeCartLines for cart ID: ${cartId}`);

  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "5fabebbde54d675f57255be67d7f17da",
        },
        body: JSON.stringify({
          query: `
          mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
          variables: {
            cartId,
            lineIds,
          },
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error removing cart lines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addCartLines/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const { lines } = req.body;

  console.log(`Request received at /addCartLines for cart ID: ${cartId}`);

  try {
    const response = await fetch(
      "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "5fabebbde54d675f57255be67d7f17da",
        },
        body: JSON.stringify({
          query: `
          mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
          variables: {
            cartId,
            lines,
          },
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error adding cart lines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
