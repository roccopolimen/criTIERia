import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Input,
  Slider,
  Typography
} from '@mui/material';

const InputSlider = (props) => {
    const provideCurrent = useRef();
    const { label, weight, current } = props;
    const [value, setValue] = useState(0);
    const minScore = 0, maxScore = 10;

    useEffect(() => {
        if(!provideCurrent.current) {
            if(current) {
                setValue(current);
                props.handleChange(label, current);
            }
            provideCurrent.current = true;
        }
    }, [current, label, props]);

    const handleSliderChange = (_event, newValue) => {
        setValue(newValue);
        props.handleChange(label, newValue);
    };

    const handleInputChange = (event) => {
        let newValue = event.target.value === '' ? '' : Math.round(Number(event.target.value))
    
        setValue(newValue);
        props.handleChange(label, newValue);
    };

    const handleBlur = () => {
        if (value < minScore) {
            setValue(minScore);
            props.handleChange(label, minScore);
        } else if (value > maxScore) {
            setValue(maxScore);
            props.handleChange(label, maxScore);
        }
    };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {`${props.label} (${weight}%):`}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : minScore}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={1}
            min={minScore}
            max={maxScore}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="number"
            inputProps={{
              step: 1,
              min: minScore,
              max: maxScore,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputSlider;