/* eslint-disable react/prop-types */
import { Avatar, Grid, Box, Rating } from '@mui/material';
import { format } from 'date-fns';

export default function ProductReviewCard({review}) {
    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className="text-white" sx={{ width: 56, height: 56, bgcolor: '#9155fd' }}>
                            {review?.user.fullName[0]}
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className="font-semibold text-lg">{review?.user.fullName}</p>
                            <p className="opacity-70">{format(new Date(review?.createdAt), 'dd/MM/yyyy HH:mm:ss')}</p>
                        </div>
                    </div>
                    <Rating value={review?.rating} name="half-rating" readOnly precision={0.5} />
                    <div dangerouslySetInnerHTML={{ __html: review?.comment }} />
                </Grid>
            </Grid>
        </div>
    );
}
