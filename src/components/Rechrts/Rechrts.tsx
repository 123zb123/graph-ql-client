// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Grid, Paper } from '@mui/material';
// import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// const YourComponent = () => {
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('inventory/Products');
//         setSalesData(response.data);

//       } catch (error) {
//         console.error('Error fetching sales data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
//       <Grid item xs={7}>
//         <Paper>
//           <BarChart width={730} height={450} data={salesData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="מלאי" fill="#8884d8" />
//           </BarChart>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default YourComponent;

import { Grid, Paper } from "@mui/material";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area,
  AreaChart
} from "recharts";

const YourComponent = () => {
  const data = [
    { name: "Page A", מלאי: 240, הזמנות: 40 },
    { name: "Page B", מלאי: 139, הזמנות: 30 },
    { name: "Page C", מלאי: 98, הזמנות: 2 },
    { name: "Page C", מלאי: 80, הזמנות: 20 },
    { name: "Page C", מלאי: 80, הזמנות: 21 },
    { name: "Page C", מלאי: 100, הזמנות: 10 },
    { name: "Page C", מלאי: 9, הזמנות: 12 },
    { name: "Page C", מלאי: 90, הזמנות: 21 },
    { name: "Page C", מלאי: 91, הזמנות: 1 },
    { name: "Page C", מלאי: 13, הזמנות: 2 },
    { name: "Page C", מלאי: 12, הזמנות: 100 },
    { name: "Page C", מלאי: 150, הזמנות: 17 },
    { name: "Page C", מלאי: 12, הזמנות: 200 },
    { name: "Page C", מלאי: 14, הזמנות: 210 },
    { name: "Page C", מלאי: 1, הזמנות: 13 },
    { name: "Page C", מלאי: 9, הזמנות: 14 },
    { name: "Page C", מלאי: 8, הזמנות: 89 },
    { name: "Page C", מלאי: 9, הזמנות: 1 },

   
  ];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10}>
        <Paper>
          <BarChart width={1150} height={550} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="מלאי" fill="#8884d8" />
            <Bar dataKey="הזמנות" fill="#82ca9d" />
          </BarChart>
          </Paper>
          <AreaChart
            width={730}
            height={250}
            data={data}
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
              dataKey="מלאי"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="הזמנות"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        
      </Grid>
    </Grid>
  );
};

export default YourComponent;
