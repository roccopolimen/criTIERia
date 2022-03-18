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
import { TIER_LIST_KEY } from 'constants';
import { makeFileNameFromTitle } from 'helpers';

const tierOrder = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F'];

const RankingPage = () => {
    const { data, adminData } = useContext(dataContext);
    const [ranks, setRanks] = useState(null);

    useEffect(() => {
        let titles = [];
        for(let tier of tierOrder)
            titles = titles.concat(adminData[TIER_LIST_KEY][tier]);
        console.log(titles);
        const results = titles.map(title => {
            return {
                title,
                image: data[makeFileNameFromTitle(title)]['Image'],
                score: data[makeFileNameFromTitle(title)]['Score'],
                tier: data[makeFileNameFromTitle(title)]['Tier'],
            }
        });
        console.log(results);
        setRanks(results);
    }, [adminData, data]);

    if(!ranks) return <Loading />;
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {ranks.map(({title, image, score, tier}, ind) => 
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
    );
};

export default RankingPage;