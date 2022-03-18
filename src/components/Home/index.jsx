import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
    Typography
} from '@mui/material';
import { types, PATH } from 'constants';
import { convertIdToTitle } from 'helpers';
import { authContext } from 'context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from 'components/LoginModal';

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useContext(authContext);
    const navigate = useNavigate();

    const handleClick = (type) => {
        if(!user) setOpenModal(true);
        else navigate(`/${PATH}/${type}/table`);
    };

    return (
    <Container>
        <Box paddingTop='10%'>
            <Typography
                variant="h1"
                align="center"
                gutterBottom
                >
                Media Scoring Site
            </Typography>
        </Box>
        <Box padding='20%' paddingBottom='5%'>
            <Grid 
            container
            spacing={{ xs: 2, md: 4 }}
            alignItems="center"
            justify="center"
            >
            {types.map(type =>
                <Grid item xs={12} md={6} key={type}>
                    <Card>
                    <CardActionArea onClick={() => handleClick(type)}>
                        <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
                        <Typography variant="h2">
                            {convertIdToTitle(type)}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                    <LoginModal open={openModal} setOpen={setOpenModal} type={type}/>
                </Grid>
            )}
            </Grid>
        </Box>
    </Container>
    );
};

export default Home;