import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';

interface FeedbackData {
  patient: string;
  rating: number;
  comment: string;
}

interface TopFeedbackListProps {
  data: FeedbackData[];
}

const TopFeedbackList: React.FC<TopFeedbackListProps> = ({ data }) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Top Feedback
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data.map((feedback, index) => (
          <ListItem
            key={index}
            divider={index !== data.length - 1}
            sx={{ py: 0 }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                    {feedback.patient}
                  </Typography>
                  <Rating
                    value={feedback.rating}
                    readOnly
                    size="small"
                    sx={{ color: '#0056b3' }}
                  />
                </Box>
              }
              secondary={
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {feedback.comment}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TopFeedbackList; 