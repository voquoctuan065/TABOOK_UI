import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import BrowseOrder from './BrowseOrder';
import WareHouse from './WareHouse';
import Packed from './Packed';
import CompleteOrder from './CompleteOrder';
import ShippingOrder from './ShippingOrder';

const steps = ['Duyệt đơn', 'Đóng gói', 'Xuất kho', 'Đang vận chuyển', 'Hoàn thành'];

export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <BrowseOrder />;
            case 1:
                return <Packed />;
            case 2:
                return <WareHouse />;
            case 3:
                return <ShippingOrder />;
            case 4:
                return <CompleteOrder />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            {renderStepContent(activeStep)}
        </Box>
    );
}
