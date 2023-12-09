import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingSpinner from "../../pages/Loading";
import { Box, Paper } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT, GET_PRODUCT_BY_ID } from "../../graphQL/graphqlProducts";
import { AdminProductInterface } from "../../interface/interface";

const apiUrl = import.meta.env.VITE_BASE_URL;

console.log(`API Base URL: ${apiUrl}`);

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<AdminProductInterface | null>(null);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const { data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    const fetchData = () => {
      try {
        if (data && data.getProductById && data.getProductById.product) {
          setTimeout(() => {  
            setProductDetails(data.getProductById.product);
          }, 2000);
        } else {
          console.error("Product details not available yet.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    fetchData();
  }, [data]); // Include data as a dependency for useEffect
  

  const handleDelete = async () => {
    try {
      const response = await deleteProduct({
        variables : {
          id: id
        }
      })
      console.log(response.data.deleteProduct.status);
      
      if (response.data.deleteProduct.status == 200) {
        console.log("Product deleted successfully");
        navigate("/erp/Products");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error during product deletion:", error);
    }
  };

  const handleEdit = () => navigate(`/erp/EditProduct/${id}`);

  return (<>
    {productDetails ? (
      <Box
        style={{
          backgroundImage: 'url("https://media.istockphoto.com/id/1096460950/vector/vector-set-of-design-templates-and-elements-for-e-commerce-in-trendy-linear-style-seamless.jpg?s=612x612&w=0&k=20&c=GhmLjjeTXzmhzX4YZ0jA6g-k7245d2i4RjIbGK2QIdY=")', // Add your background image URL
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" height="100vh">
          <Paper style={{ background: "#f0eae2", padding: "20px" }}>
            <Card
              sx={{
                maxWidth: "60em",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent style={{ display: "flex" }}>
                <Typography component="div" style={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    alt={productDetails.image_alt}
                    height="320"
                    image={productDetails.image_url}
                    sx={{ width: "50%", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <Typography
                    component="div"
                    style={{ paddingLeft: "1em", width: "50%" }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ marginBottom: "10px", color: "#333" }}
                    >
                      {productDetails.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Sale Price: $
                      {productDetails.sale_price}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Quantity:{" "}
                      {productDetails.quantity}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Description:{" "}
                      {productDetails.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Discount Percentage:{" "}
                      {productDetails.discount_percentage}%
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Is For Sale:{" "}
                      {productDetails["is_for_sale"] ? "Yes" : "No"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Cost Price: ${productDetails["cost_price"]}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", marginBottom: "8px" }}
                    >
                      Supplier: {productDetails["supplier"]}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#d32f2f",
                        "&:hover": { bgcolor: "#b71c1c" },
                      }}
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: "7em",
                        backgroundColor: "#1976D2",
                        "&:hover": { backgroundColor: "#1565C0" },
                      }}
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  </Typography>
                </Typography>

              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Box>

    ) : (<LoadingSpinner />)
    }
  </>
  );
};

export default ProductDetails;
