import { Table, Container } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';

function UserPurchase(){
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const dealer_name = localStorage.getItem('dealer_name');

    const fetchPurchaseHistory = useCallback(async () => {
        try {
          const { data, error } = await supabase
            .from('dealer_sales')
            .select('*')
            .eq('dealer_name', dealer_name);

            if (error) {
                throw error;
            } 
            setPurchaseHistory(data);
        } catch (error) {
          console.error('Error during fetching purchase history:', error.message);
        }
    }, [dealer_name]);
    
    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return(
        <>
            <DealerNavbar />
            <Container className='mt-4'>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>CUSTOMER</th>
                            <th>CAR</th>
                            <th>STYLE</th>
                            <th>COLOR</th>
                            <th>ENGINE</th>
                            <th>PRICE</th>
                            <th>TRANSMISSION</th>
                            <th>VIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.map((purchase) => (
                            <tr>
                                <td>{purchase.user_name}</td>
                                <td>{purchase.car_name}</td>
                                <td>{purchase.car_style}</td>
                                <td>{purchase.car_color}</td>
                                <td>{purchase.car_engine}</td>
                                <td>{purchase.car_price}</td>
                                <td>{purchase.transmission_type}</td>
                                <td>{purchase.VIN}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default UserPurchase;