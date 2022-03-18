import { useEffect, useRef, useState } from 'react';
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';

const ToggleSelector = (props) => {
    const provideCurrent = useRef();
    const { label, values, current } = props;
    const [selection, setSelection] = useState(current ? current : '');

    useEffect(() => {
        if(!provideCurrent.current) {
            if(current) {
                setSelection(current);
                props.handleChange(label, current);
            }
            provideCurrent.current = true;
        }
    }, [current, label, props]);

    const handleChange = (_event, newSelection) => {
        setSelection(newSelection);
        props.handleChange(label, newSelection);
    };

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="toggle-selector" gutterBottom>
            {`${label}`}
            </Typography>

            <ToggleButtonGroup
                color="primary"
                value={selection}
                exclusive
                onChange={handleChange}
            >
                {values.map((value, index) => (
                    <ToggleButton key={index} value={value}>{value}</ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
}

export default ToggleSelector;