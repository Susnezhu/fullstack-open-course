import { TextField, InputLabel } from '@mui/material';

interface TypeFieldProps {
  employerName: string,
  setEmployerName: React.Dispatch<React.SetStateAction<string>>,
  sickLeaveStart: string,
  setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>,
  sickLeaveEnd: string,
  setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>
};


const OccupationalHealthcareTypeField = ({employerName, setEmployerName, sickLeaveStart, setSickLeaveStart, sickLeaveEnd, setSickLeaveEnd}: TypeFieldProps) => {


  return (
    <div style={{marginTop: '10px'}}>
    <TextField
      label="employerName"
      fullWidth 
      value={employerName}
      onChange={({ target }) => setEmployerName(target.value)}
    />

    <p>sickleave:</p>
    <InputLabel sx={{ marginTop: 2.5 }}>start date</InputLabel>
    <TextField
      fullWidth
      type='date'
      value={sickLeaveStart}
      onChange={({ target }) => setSickLeaveStart(target.value)}
    />

    <InputLabel sx={{ marginTop: 2.5 }}>end date</InputLabel>
    <TextField
      fullWidth 
      type='date'
      value={sickLeaveEnd}
      onChange={({ target }) => setSickLeaveEnd(target.value)}
    />
    </div>
  );
};


export default OccupationalHealthcareTypeField;