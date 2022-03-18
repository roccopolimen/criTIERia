import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Container,
    SpeedDial,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { Home } from "@material-ui/icons";
import { convertIdToTitle } from "helpers";
import { dataContext } from "context";
import Loading from "components/Loading";
import TablePage from "components/TablePage";
import { PATH } from "constants";
import TierPage from "components/TierPage";
import RankingPage from "components/RankingPage";
import OrderPage from "components/OrderPage";

const tabs = ['table', 'tier-list', 'rankings', 'view-order', 'edit-rubric', 'sync-scores'];

const MainPage = () => {
    const hasFetchedData = useRef();
    const [page, setPage] = useState(null);
    const { loading, data, getData } = useContext(dataContext);
    const { type, tab } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!hasFetchedData.current) {
            getData(type);
            hasFetchedData.current = true;
        }
    }, [getData, type]);

    useEffect(() => {
        switch(tabs.indexOf(tab)) {
            case 0:
                setPage(<TablePage />);
                break;
            case 1:
                setPage(<TierPage />);
                break;
            case 2:
                setPage(<RankingPage />);
                break;
            case 3:
                setPage(<OrderPage />);
                break;
            case 4:
                setPage(null);
                break;
            case 5:
                setPage(null);
                break;
            default:
                setPage(null);
                break;
        }
    }, [tab]);

    if(loading || !data) return <Loading />;
    return (
        <Container maxWidth='100%'>
            <Box>
            <Typography
                variant="h2"
                align="center"
                component="h1"
                gutterBottom
                >
                {convertIdToTitle(type)} Scoring
            </Typography>
            </Box>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs
                    value={tabs.indexOf(tab)}
                    onChange={(_e, v) => navigate(`../${tabs[v]}`)}
                    centered
                >
                    {tabs.map(id => <Tab key={id} label={convertIdToTitle(id)} />)}
                </Tabs>
            </Box>
            <Box paddingX='5%' paddingTop='1%'>
            {page}
            </Box>
            <SpeedDial
                ariaLabel="add new entry"
                sx={{ position: 'absolute', bottom: 16, left: 16 }}
                icon={<Home />}
                onClick={() => navigate(`/${PATH}`)}
            />
        </Container>
    );
};

export default MainPage;