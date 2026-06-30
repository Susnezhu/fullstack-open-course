import * as React from 'react';
import diagnosService from '../../services/diagnoses';
import type { Diagnosis } from '../../types';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export default function ChooseDiagnosesCodes() {
  const [diagnoses, setDiagnose] = React.useState<Diagnosis[]>();
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);


  React.useEffect(() => {
    const fetchDiagnos = async () => {
      const diagnoses = await diagnosService.getAll();
      if (diagnoses) {
        setDiagnose(diagnoses);
      }
    };
    void fetchDiagnos();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const { target: { value } } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{width: '100%', marginTop: '10px' }}>
        <InputLabel>diagnoses codes</InputLabel>
        <Select
          id="diagnoses_codes"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {diagnoses?.map((diagnos) => (
            <MenuItem
              key={diagnos.code}
              value={diagnos.code}
            >
              {diagnos.code + '-' + diagnos.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
