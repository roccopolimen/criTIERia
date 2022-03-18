import { 
    Box,
    Container,
    Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}
        >
        <Container maxWidth="sm">
            <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            >
            404 Not Found.
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            <Link to='/' style={{ color: 'unset' }} >Go Home</Link>{'     '}
            <Link
                style={{ color: 'unset' }}
                onClick={e => {
                e.preventDefault();
                navigate(-1);
                }}
                to=''
            >Go Back</Link>
            </Typography>
        </Container>
        </Box>
    );
};

export default NotFound;