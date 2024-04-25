
import { Grid } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

export default function OrderCard() {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/account/order/${5}`)} className="p-5 shadow-lg hover:shadow-2xl border">
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={6}>
                    <div className="flex cursor-pointer">
                        <img src="" alt="" className="w-[5rem] h-[5rem] object-cover object-top" />
                        <div className="ml-5 space-2">
                            <p> Men Slim Mid Rise Black Jeans</p>
                            <p className="opacity-50 text-xs font-semibold">Size: M</p>
                            <p className="opacity-50 text-xs font-semibold">Color: Black</p>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p>$23</p>
                </Grid>

                <Grid item xs={4}>
                    {true && (
                        <div>
                            <p>
                                <AdjustIcon
                                    sx={{ width: '15px', height: '15px' }}
                                    className="text-green-600 mr-2 text-sm"
                                />
                                <span>Delivery On March 03</span>
                            </p>

                            <p className="text-xs ">Your item</p>
                        </div>
                    )}

                    {false && (
                        <p>
                            <span>Expected Delivery On Mar 03</span>
                        </p>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
