/* eslint-disable react-hooks/exhaustive-deps */
import { LineChart } from '@mui/x-charts/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDeliveredOrder } from '../../../State/Order/Action';

export default function BasicLineChart() {
    const dispatch = useDispatch();

    const { orders } = useSelector((store) => ({
        orders: store.order.orders || [],
    }));

    const jwt = localStorage.getItem('adminJwt');

    useEffect(() => {
        if (jwt) {
            dispatch(getAllDeliveredOrder(jwt));
        }
    }, [jwt]);

    if (!Array.isArray(orders)) {
        return <div>Loading...</div>; // or handle loading state appropriately
    }

    const monthlyRevenue = new Array(12).fill(0);

    orders.forEach((order) => {
        const orderDate = new Date(order.orderDate);
        const month = orderDate.getMonth();
        const revenue = order.totalPrice;
        monthlyRevenue[month] += revenue;
    });

    const xAxisData = Array.from({ length: 12 }, (_, i) => i + 1);

    const seriesData = monthlyRevenue;

    return (
        <>
            <div className='mt-[25px] font-semibold text-xl'>Biểu đồ doanh thu theo tháng</div>
            <LineChart
                xAxis={[{ data: xAxisData, type: 'category' }]}
                series={[
                    {
                        data: seriesData,
                    },
                ]}
                width={600}
                height={400}
                sx={{ pr: '2rem', pt: '2rem', pb: '2rem' }}
            />
        </>
    );
}
