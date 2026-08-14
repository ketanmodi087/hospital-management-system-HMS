import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Mock data - in a real app this would come from your CRM API
const campaignData = [
  { name: 'Google Ads', leads: 420, conversions: 128, cost: 12500, roi: 3.2 },
  { name: 'Facebook', leads: 380, conversions: 98, cost: 9800, roi: 2.8 },
  { name: 'Direct Mail', leads: 210, conversions: 75, cost: 7500, roi: 2.5 },
  { name: 'Radio', leads: 180, conversions: 62, cost: 6500, roi: 2.1 },
  { name: 'TV', leads: 320, conversions: 105, cost: 18500, roi: 1.8 },
];

const conversionTrends = [
  { month: 'Jan', conversions: 85 },
  { month: 'Feb', conversions: 92 },
  { month: 'Mar', conversions: 104 },
  { month: 'Apr', conversions: 121 },
  { month: 'May', conversions: 135 },
  { month: 'Jun', conversions: 148 },
];

const leadSources = [
  { name: 'Website', value: 45 },
  { name: 'Phone', value: 30 },
  { name: 'Walk-in', value: 15 },
  { name: 'Referral', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const KpiCard = ({ title, value, change }:any) => {
  const isPositive = change >= 0;
  
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Typography 
          variant="caption" 
          color={isPositive ? 'success.main' : 'error.main'}
        >
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
        </Typography>
      </CardContent>
    </Card>
  );
};

const CampaignPerformanceTable = () => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Campaign Performance
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Campaign</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Leads</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Conversions</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Cost</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>ROI</th>
            </tr>
          </thead>
          <tbody>
            {campaignData.map((row) => (
              <tr key={row.name} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{row.name}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{row.leads}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{row.conversions}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${row.cost.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{row.roi}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
};

const MarketingDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom>
        Marketing Performance Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Patient Acquisition & Campaign Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Leads" value="1,510" change={12} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="New Patients" value="468" change={8} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Conversion Rate" value="31%" change={3} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Avg. Cost per Patient" value="$89" change={-5} />
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Conversions Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Patient Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Lead Sources
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CampaignPerformanceTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Top Performing Campaigns
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={campaignData.slice().sort((a, b) => b.roi - a.roi).slice(0, 3)}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="roi" fill="#82ca9d" name="ROI (x)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Data refreshed from CRM: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default MarketingDashboard;