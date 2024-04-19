import { Avatar, Grid, Box, Rating } from '@mui/material';

export default function ProductReviewCard() {
    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className="text-white" sx={{ width: 56, height: 56, bgcolor: '#9155fd' }}>
                            R
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className="font-semibold text-lg">Tuan</p>
                            <p className="opacity-70">March 02, 2024</p>
                        </div>
                    </div>
                    <Rating value={4.5} name="half-rating" readOnly precision={0.5} />
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, dolor mollitia nesciunt
                        inventore praesentium perferndis cumque explicabo sit commodi, amet
                    </p>
                </Grid>
            </Grid>
        </div>
    );
}
