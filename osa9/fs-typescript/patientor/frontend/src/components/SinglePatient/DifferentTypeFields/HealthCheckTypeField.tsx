import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import type { HealthCheckRating } from '../../../types';

interface TypeFieldProps {
  healthCheckRating: HealthCheckRating, 
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
};

const HealthCheckTypeField = ({healthCheckRating, setHealthCheckRating}: TypeFieldProps) => {

  const HealthCheckRatingValues = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value) as HealthCheckRating;
    setHealthCheckRating(value);
  };

  return (
    <div>
      <InputLabel sx={{ marginTop: 2.5 }}>health check rating</InputLabel>
        <Select
          label="healthCheckRating"
          fullWidth
          value={healthCheckRating}
          onChange={(event) => onHealthCheckRatingChange(event)}
        >
        {Object.entries(HealthCheckRatingValues).map(([label, value]) =>
          <MenuItem
            key={value}
            value={value}
          >
            {value} - {label}
            </MenuItem>
        )}
        </Select>
    </div>
  );
};


export default HealthCheckTypeField;