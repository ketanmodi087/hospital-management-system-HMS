import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';

interface StaffData {
  name: string;
  role: string;
  status: string;
  patients: number;
}

interface ActiveStaffListProps {
  data: StaffData[];
}

const ActiveStaffList: React.FC<ActiveStaffListProps> = ({ data }) => {
  return (
    <Box sx={{ p: 1.5, height: '320px', overflow: 'auto' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
        Active Staff
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
        {data.map((staff, index) => (
          <ListItem
            key={index}
            divider={index !== data.length - 1}
            sx={{ py: 0 }}
          >
            <ListItemText
              primary={staff.name}
              secondary={staff.role}
              primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }}
              secondaryTypographyProps={{ fontSize: 13 }}
            />
            <ListItemSecondaryAction sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip
                label={`${staff.patients} patients`}
                size="small"
                sx={{
                  fontSize: 13,
                  bgcolor: 'rgba(0, 155, 171, 0.08)',
                  color: '#009bab',
                }}
              />
              <Chip
                label={staff.status}
                size="small"
                sx={{ 
                  fontSize: 13,
                  bgcolor: '#e8f5f6',
                  color: '#009bab'
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActiveStaffList; 