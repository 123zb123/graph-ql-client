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
  Area
} from "recharts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphQL/graphqlProducts";

const YourComponent = () => {
  const { data } = useQuery(GET_PRODUCTS);

  const da = data?.getProducts.products.slice(0, 6);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10}>
        <Paper elevation={3} style={{ background: '#f0f0f0', padding: '20px' }}>
          <BarChart width={1000} height={300} data={da}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sale_price" fill="#8884d8" />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        </Paper>

        <Paper elevation={3} style={{ background: '#f0f0f0', padding: '20px', marginTop: '20px' }}>
          <AreaChart
            width={730}
            height={250}
            data={da}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              dataKey="sale_price"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="quantity"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default YourComponent;

