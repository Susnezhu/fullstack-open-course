import { TextField, InputLabel } from '@mui/material';

interface TypeFieldProps {
  dischargeDate: string,
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>,
  dischargeCriteria: string,
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
};

const HospitalTypeField = ({dischargeDate, setDischargeDate, dischargeCriteria, setDischargeCriteria}: TypeFieldProps) => {


  return (
    <div style={{marginTop: '10px'}}>
      <InputLabel sx={{ marginTop: 2.5 }}>discharge date</InputLabel>
      <TextField
        type='date'
        fullWidth 
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />

      <TextField
        label="dischargeCriteria"
        fullWidth 
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </div>
  );
};


export default HospitalTypeField;