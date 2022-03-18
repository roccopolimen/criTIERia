import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { RUBRIC_KEY } from 'constants';
import { dataContext } from 'context';
import InputSlider from 'components/InputSlider';
import ToggleSelector from 'components/ToggleSelector';
import { buildEntry } from 'helpers';

const initialMeasures = (rubric) => {
    const mTmp = {};
    for(let key in rubric) {
        if(typeof rubric[key] === 'number') mTmp[key] = 0;
        else mTmp[key] = '';
    }
    return mTmp;
};

const ScoreModal = (props) => {
    const { 
        title,
        setTitle,
        open,
        setOpen,
        pSetOpen,
        current,
        add } = props;
    const { data, adminData, updateData } = useContext(dataContext);
    const { type } = useParams();
    const [measures, setMeasures] = useState(initialMeasures(adminData[RUBRIC_KEY]));

    const handleChange = (label, value) => {
        setMeasures(prev => ({
            ...prev,
            [label]: value
        }));
    };

    const resetState = () => setMeasures(initialMeasures(adminData[RUBRIC_KEY]));

    const handleSubmit = (_v) => {
        (async () => {
            const newData = add ? 
                            await buildEntry(title, measures, type, adminData) : 
                            await buildEntry(title, measures, type, adminData, false, data);
            if(newData) updateData(newData);
        })();
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Score</DialogTitle>
            <DialogContent>
                {Object.entries(adminData[RUBRIC_KEY]).map(([key, value], index) => {
                    if(typeof value === 'number')
                        return <InputSlider 
                                    key={index}
                                    label={key}
                                    weight={value}
                                    handleChange={handleChange}
                                    current={current?.[key]}
                                />;
                    else
                        return <ToggleSelector
                                    key={index}
                                    label={key}
                                    values={Object.keys(value)}
                                    handleChange={handleChange}
                                    current={current?.[key]}
                                />;
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    pSetOpen(true);
                }}>Go Back</Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    setOpen(false);
                    resetState();
                    setTitle('');
                    pSetOpen(false);
                }}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScoreModal;