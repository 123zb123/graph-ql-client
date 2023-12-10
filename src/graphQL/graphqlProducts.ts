import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query GetProducts {
  getProducts {
    message
    status
    products {
      product_id
      name
      sale_price
      quantity
      description
      category
      discount_percentage
      image_url
      image_alt
      is_for_sale
      cost_price
      supplier
    } 
  }
}
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      message
      status
      product {
        product_id
        name
        sale_price
        quantity
        description
        category
        discount_percentage
        image_url
        image_alt
        is_for_sale
        cost_price
        supplier
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id) {
      status
      message
      success
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $product: UpdateProduct!) {
    updateProduct(id: $id, product: $product) {
      status
      message
      success
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($product: UpdateProduct!) {
    addProduct(product: $product) {
      status
      message
      product {
        product_id
      }
    }
  }
`;
