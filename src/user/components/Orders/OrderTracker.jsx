/* eslint-disable react/prop-types */
import { Step, StepLabel, Stepper } from '@mui/material';

const steps = ['Placed', 'Order Confirmed', 'Shipped', 'Out For Delivery', ':Delivered'];

export default function OrderTracker({ activeStep }) {
    return (
        <div className="w-full">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel sx={{ color: '#9155fd', fontSize: '44px' }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
