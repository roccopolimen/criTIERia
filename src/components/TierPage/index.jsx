import { SpeedDial, Tooltip, useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Save } from "@material-ui/icons";
import Loading from 'components/Loading';
import { tierColors } from 'constants';
import { TIER_LIST_KEY } from 'constants';
import { dataContext } from 'context';
import { getImageUrlFromTitle } from 'helpers';
import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { updateTierList } from 'api/gist';

const reorder = (tierlist, rowIndex, startIndex, endIndex) => {
    const row = tierlist[rowIndex];
    const result = Array.from(row);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

const getItemStyle = (theme, isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '0.5%',
    display: 'flex',
    justifyContent: 'center',
    background: isDragging ? 'lightgreen' : `${theme.palette.background.default}`,
    ...draggableStyle,
});

const getListStyle = (theme, isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : `${theme.palette.background.default}`,
    display: 'flex',
    margin: 0,
    overflow: 'visible'
});

const TierPage = () => {
    const theme = useTheme();
    const { type } = useParams();
    const { adminData, data, updateData } = useContext(dataContext);
    const [tierList, setTierList] = useState(null);

    const onDragEnd = (result, row) => {
        if (!result.destination) return;
        const newOrder = reorder(tierList, row, result.source.index, result.destination.index);
        const copyTierList = JSON.parse(JSON.stringify(tierList));
        copyTierList[row] = newOrder;
        setTierList(copyTierList);
    };

    const handleSave = () => {
        (async () => {
            const newData = await updateTierList(tierList, type);
            updateData(newData);
        })();
    };

    useEffect(() => {
        setTierList(adminData[TIER_LIST_KEY]);
    }, [adminData]);

    if(!tierList) return <Loading />;
    return (
        <div>
        <Box
            sx={{
                maxHeight: 700,
                overflow: 'auto',
                paddingX: '0%',
                background: `${theme.palette.background.default}`
            }}>
        {Object.keys(tierList).map(tier =>
            <DragDropContext key={tier} onDragEnd={(res) => onDragEnd(res, tier)} style={{overflow: 'scroll'}}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(theme, snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        <Draggable draggableId={tier} isDragDisabled={true} index={-1}>
                            {(provided, _snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                    padding: '0.5%',
                                    background: `${theme.palette.background.default}`,
                                }}
                            >
                                <Typography
                                    height={150}
                                    width={100}
                                    variant='h2'
                                    style={{
                                        backgroundColor: tierColors[tier],
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {tier}
                                </Typography>
                            </div>
                            )}
                        </Draggable>
                        {tierList[tier].map((title, index) => (
                        <Draggable key={title} draggableId={title} index={index}>
                            {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                theme,
                                snapshot.isDragging,
                                provided.draggableProps.style
                                )}
                            >
                                <Tooltip title={title} followCursor>
                                    <img 
                                        src={getImageUrlFromTitle(title, data)}
                                        alt={title}
                                        style={{height: 150, width: 100}}
                                    />
                                </Tooltip>
                            </div>
                            )}
                        </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
        )}
      </Box>
      <SpeedDial
                ariaLabel="add new entry"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<Save />}
                onClick={handleSave}
            />
      </div>
    );
};

export default TierPage;