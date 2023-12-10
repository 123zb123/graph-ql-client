import { Grid, Paper } from "@mui/material";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphQL/graphqlProducts";
import { Typography } from '@mui/material';



const YourComponent = () => {
  const { data } = useQuery(GET_PRODUCTS);

  const da = data?.getProducts.products.slice(0, 6);

  return (
    <Typography style={{ minHeight: '100vh', position: 'relative' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
        component={"div"}
      >
        <Grid item xs={10} component={"div"}>
          <Paper
            component={"div"}
            elevation={3}
            style={{ background: "#f0f0f0", padding: "20px", marginTop: "50px",marginBottom: "50px"  }}
          >
            <BarChart width={1100} height={300} data={da}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sale_price" fill="#8884d8" />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </Paper>
          <Paper
            elevation={3}
            style={{ background: "#f0f0f0", padding: "20px", marginTop: "50px", marginBottom: "50px" }}
            component={"div"}
          >
            <AreaChart
              width={1100}
              height={290}
              data={da}
              margin={{ top: 10, right: 30, left: 0, bottom: 20}}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="discount_percentage"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="cost_price"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </Paper>
        </Grid>
      </Grid>
    </Typography>
  );
};

export default YourComponent;
