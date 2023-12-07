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
        <Paper elevation={3} style={{ background: '#f0f0f0', padding: '20px',marginTop: '50px' }}>
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

        <Paper elevation={3} style={{ background: '#f0f0f0', padding: '20px', marginTop: '50px' }}>
          <AreaChart
            width={1100}
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
  );
};

export default YourComponent;

// import { Grid, Paper } from "@mui/material";
// import {
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
//   Area,
//   AreaChart
// } from "recharts";

// const YourComponent = () => {
//   const data = [
//     { name: "Page A", מלאי: 240, הזמנות: 40 },
//     { name: "Page B", מלאי: 139, הזמנות: 30 },
//     { name: "Page C", מלאי: 98, הזמנות: 2 },
//     { name: "Page C", מלאי: 80, הזמנות: 20 },
//     { name: "Page C", מלאי: 80, הזמנות: 21 },
//     { name: "Page C", מלאי: 100, הזמנות: 10 },
//     { name: "Page C", מלאי: 9, הזמנות: 12 },
//     { name: "Page C", מלאי: 90, הזמנות: 21 },
//     { name: "Page C", מלאי: 91, הזמנות: 1 },
//     { name: "Page C", מלאי: 13, הזמנות: 2 },
//     { name: "Page C", מלאי: 12, הזמנות: 100 },
//     { name: "Page C", מלאי: 150, הזמנות: 17 },
//     { name: "Page C", מלאי: 12, הזמנות: 200 },
//     { name: "Page C", מלאי: 14, הזמנות: 210 },
//     { name: "Page C", מלאי: 1, הזמנות: 13 },
//     { name: "Page C", מלאי: 9, הזמנות: 14 },
//     { name: "Page C", מלאי: 8, הזמנות: 89 },
//     { name: "Page C", מלאי: 9, הזמנות: 1 },

//   ];

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       style={{ height: "100vh" }}
//     >
//       <Grid item xs={12}>
//         <Paper style={{ marginBottom: 20 }}>
//           <BarChart width={1150} height={550} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="מלאי" fill="#8884d8" />
//             <Bar dataKey="הזמנות" fill="#82ca9d" />
//           </BarChart>
//         </Paper>
//       </Grid>
//       <Grid item xs={12}>
//         <Paper>
//           <AreaChart
//             width={1150}
//             height={250}
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <defs>
//               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="מלאי"
//               stroke="#8884d8"
//               fillOpacity={1}
//               fill="url(#colorUv)"
//             />
//             <Area
//               type="monotone"
//               dataKey="הזמנות"
//               stroke="#82ca9d"
//               fillOpacity={1}
//               fill="url(#colorPv)"
//             />
//           </AreaChart>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };
// export default YourComponent;
