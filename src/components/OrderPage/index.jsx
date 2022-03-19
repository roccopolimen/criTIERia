import { Fragment, useContext, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import { dataContext } from 'context';
import Loading from 'components/Loading';
import { ORDER_KEY } from 'constants';
import { makeFileNameFromTitle } from 'helpers';

const OrderPage = () => {
    const { data, adminData } = useContext(dataContext);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const results = adminData[ORDER_KEY].map(title => {
            return {
                title,
                image: data[makeFileNameFromTitle(title)]['Image'],
                score: data[makeFileNameFromTitle(title)]['Score'],
                tier: data[makeFileNameFromTitle(title)]['Tier'],
            }
        });
        setOrders(results);
    }, [adminData, data]);

    if(!orders) return <Loading />;
    return (
        <Box maxHeight={700} overflow="auto">
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {orders.map(({title, image, score, tier}, ind) => 
                    <div key={ind}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={title} src={image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${ind+1}. ${title}`}
                                secondary={
                                    <Fragment>
                                        {`Score: ${score} | Tier: ${tier}`}
                                    </Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                )}
            </List>
        </Box>
        </Box>
    );
};

export default OrderPage;