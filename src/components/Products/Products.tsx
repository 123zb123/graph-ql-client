import axios from "axios";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, Select, InputLabel } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdminProductInterface } from "../../interface/interface";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import SkeletonTable from "../../pages/Skeleton";
import "./Products.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphQL/graphqlProducts";

const apiUrl = import.meta.env.VITE_BASE_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "lightgrey",
  },
}));

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<AdminProductInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    AdminProductInterface[]
  >([]);
  const [loadingData, setloadingData] = useState(true);
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const handleSortChange = (option: string) => {
    if (option === sortOption) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortOrder("asc");
    }
  };
  const handleToggleIsForSale = async (productId: string) => {
    try {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          if (product.product_id === productId) {
            const updatedProduct = {
              ...product,
              is_for_sale: !product.is_for_sale,
            };
            const res = await axios.patch(
              `${apiUrl}/products/inventory/${productId}`,
              {
                is_for_sale: updatedProduct.is_for_sale,
              },
              {
                headers: {
                  Authorization: Cookies.get("token"),
                },
              }
            );
            console.log(res);

            return updatedProduct;
          }
          return product;
        })
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating is_for_sale property:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!error) {
          setTimeout(() => {
            setloadingData(false);
          }, 2000);
          setProducts(data.getProducts.products);
          setFilteredProducts(data.getProducts.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setloadingData(false);
      }
    };

    fetchData();
  }, [loading, error, data]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) => {
      const sortedProducts = [...prevFilteredProducts].sort(
        (a: AdminProductInterface, b: AdminProductInterface) => {
          const valueA =
            sortOption === "name"
              ? a.name
              : sortOption === "sale_price"
              ? parseFloat(String(a.name))
              : sortOption === "discount_percentage"
              ? parseFloat(String(a.discount_percentage))
              : sortOption === "description"
              ? a.description
              : sortOption === "quantity"
              ? a.quantity
              : 0;

          const valueB =
            sortOption === "name"
              ? b.name
              : sortOption === "sale_price"
              ? parseFloat(String(b.sale_price))
              : sortOption === "discount_percentage"
              ? parseFloat(String(b.discount_percentage))
              : sortOption === "description"
              ? b.description
              : sortOption === "quantity"
              ? b.quantity
              : 0;

          if (typeof valueA === "number" && typeof valueB === "number") {
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
          } else {
            const nameA = String(valueA).toUpperCase();
            const nameB = String(valueB).toUpperCase();

            if (nameA < nameB) {
              return sortOrder === "asc" ? -1 : 1;
            } else if (nameA > nameB) {
              return sortOrder === "asc" ? 1 : -1;
            }

            return 0;
          }
        }
      );

      return sortedProducts;
    });
  }, [sortOption, sortOrder]);

  const handleProductClick = (productId: string | undefined) => {
    navigate(`/erp/Product/${productId}`);
  };

  const handleAddProduct = async () => {
    navigate(`/erp/addProduct`);
  };

  return (
    <Box>
      <Typography
        component="div"
        style={{
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Typography component="h2" style={{ marginRight: "10px" }}>
          All Products
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "30px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                color: "black",
                borderRadius: "30px",
                height: "40px",
              },
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <InputLabel
            sx={{
              color: "white",
              borderRadius: "15px",
              margin: "0",
              marginLeft: "10px", // Adding margin for better spacing
            }}
          >
            Sort By:
          </InputLabel>
          <Select
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            sx={{
              color: "white",
              borderRadius: "5px",
              backgroundColor: "#aaaaaa", // Adjust the color code as needed
              height: "40px",
              marginLeft: "5px", // Adding margin for better spacing
            }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="sale_price">Sale Price</MenuItem>
            <MenuItem value="discount_percentage">Discount Percentage</MenuItem>
            <MenuItem value="description">Description</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <InputLabel
            sx={{
              color: "white",
              borderRadius: "15px",
              margin: "0",
              marginLeft: "10px",
            }}
          >
            Sort Order:
          </InputLabel>
          <Select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            sx={{
              color: "white",
              borderRadius: "5px",
              backgroundColor: "#aaaaaa",
              height: "40px",
              marginLeft: "5px",
            }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleAddProduct}
            style={{
              padding: "8px",
              borderRadius: "15px",
              backgroundColor: "black",
              color: "white",
              height: "40px",
              marginLeft: "10px",
            }}
          >
            Add Product
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/erp/graph")}
            style={{
              padding: "8px",
              borderRadius: "15px",
              backgroundColor: "black",
              color: "white",
              height: "40px",
              marginLeft: "10px",
            }}
          >
            users charts
          </Button>
          <Button
            onClick={() => navigate("/erp/Recharts")}
            style={{
              padding: "8px",
              borderRadius: "15px",
              backgroundColor: "black",
              color: "white",
              height: "40px",
              marginLeft: "10px",
            }}
          >
            Go to Recharts
          </Button>

          <Button
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
            }}
            style={{
              padding: "8px",
              borderRadius: "15px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              height: "40px",
              marginLeft: "10px",
            }}
          >
            Logout
          </Button>
        </div>
      </Typography>

      {loadingData ? (
        <SkeletonTable />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead
              style={{ position: "sticky", top: 0 }}
              className="TableStickyHeader"
            >
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Sale Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="right">
                  Discount Percentage
                </StyledTableCell>
                <StyledTableCell align="right">Picture</StyledTableCell>
                <StyledTableCell align="right">Is For Sale</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.map((product) => (
                <StyledTableRow
                  key={product.product_id || ""}
                  onClick={() => handleProductClick(product.product_id)}
                >
                  <StyledTableCell component="th" scope="row">
                    {product.product_id || "No Name"}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {product.name || "No Name"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.sale_price + "$" || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.quantity || 0}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.description || "No Description"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.discount_percentage + "%" || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography
                      component="div"
                      onMouseEnter={() => setHoveredImage(product.image_url)}
                      onMouseLeave={() => setHoveredImage(null)}
                      style={{ position: "relative" }}
                    >
                      <img
                        src={product.image_url}
                        alt={product.image_alt || "No Alt Text"}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "13%",
                        }}
                      />
                      {hoveredImage === product.image_url && (
                        <Typography
                          component="div"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1,
                          }}
                        >
                          <img
                            src={product.image_url}
                            alt={product.image_alt || "No Alt Text"}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "13%",
                            }}
                          />
                        </Typography>
                      )}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.is_for_sale ? (
                      <CheckIcon
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the row click event from triggering
                          const productId = product.product_id;
                          if (productId) {
                            handleToggleIsForSale(productId);
                          } else {
                            console.error("Product ID is undefined");
                          }
                        }}
                      />
                    ) : (
                      <ClearIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const productId = product.product_id;
                          if (productId) {
                            handleToggleIsForSale(productId);
                          } else {
                            console.error("Product ID is undefined");
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
