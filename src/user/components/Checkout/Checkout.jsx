import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useLocation } from 'react-router-dom';
import DeliveryForm from './DeliveryForm';
import OrderSummary from './OrderSummary';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const steps = ['Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);

    const location = useLocation();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    React.useEffect(() => {
        const querySearch = new URLSearchParams(location.search);
        const step = querySearch.get('step');
        if (step) {
            setActiveStep(parseInt(step));
        }
    }, []);

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Thanh toán</title>
            </Helmet>

            <div className="bg-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5">
                    <Box className="">
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1, fontWeight: 'bold', color: '#000' }}
                                    >
                                        Trở lại
                                    </Button>
                                </Box>
                                <div className="mt-10">{activeStep === 0 ? <DeliveryForm /> : <OrderSummary />}</div>
                            </React.Fragment>
                        )}
                    </Box>
                </div>
            </div>

            <Footer />
        </>
    );
}
