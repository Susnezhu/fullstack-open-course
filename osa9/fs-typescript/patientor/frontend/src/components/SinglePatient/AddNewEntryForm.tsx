import axios from 'axios';
import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Button, SelectChangeEvent } from '@mui/material';

import ChooseDiagnosesCodes from './ChooseDiagnosesCodes';

import patientService from '../../services/patients';

import type { NewEntryValuest } from '../../types';
import { HealthCheckRating } from '../../types';

import HealthCheckTypeField from './DifferentTypeFields/HealthCheckTypeField';
import HospitalTypeField from './DifferentTypeFields/HospitalTypeField';
import OccupationalHealthcareTypeField from './DifferentTypeFields/OccupationalHealthcareTypeField';


const AddNewEntryForm = ({personId, toggleFormOpen}: {personId: string, toggleFormOpen: VoidFunction}) => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');

  const [type, setType] = useState('HealthCheck');

  //optional 
  type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const types = [ 'HealthCheck', 'Hospital', 'OccupationalHealthcare'];

  const cleanAllFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setType('HealthCheck');
    setHealthCheckRating(0);
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    toggleFormOpen();
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const typeValue = types.find(t => t.toString() === value);
      if (typeValue) {
        setType(typeValue);
      }
    }
  };


  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const discharge = {
      date: dischargeDate,
      criteria: dischargeCriteria
    };

    const sickLeave = {
      startDate: sickLeaveStart,
      endDate: sickLeaveEnd
    };

    let newEntry: NewEntryValuest;

    switch (type) {
      case 'HealthCheck':
        newEntry = {
          description,
          date,
          specialist,
          type: 'HealthCheck',
          healthCheckRating
        };
        break;
    
      case 'Hospital':
        newEntry = {
          description,
          date,
          specialist,
          type: 'Hospital',
          discharge
        };
        break;

      case 'OccupationalHealthcare':
        newEntry = {
          description,
          date,
          specialist,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave
        };

        break;

      default:
        throw new Error(JSON.stringify([{ message: `Unknown entry type: ${type}`}]));
    }

    const id = personId;

    try {
      const addedEntry = await patientService.newEntry(newEntry, id);
      toggleFormOpen();
      
      return addedEntry;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          const errors = JSON.parse(
            error.response.data.replace("Something went wrong. Error:", "")
          );

          setErrorMessage(errors.map((e: { message: string }) => e.message));
          console.log(errors);
        } else {
          setErrorMessage(['Unrecognized axios error']);
        }
      } else {
        setErrorMessage(['Unknown error']);
      }
      console.log(error);
      
    }
  };

  return (
    <div style={{margin: '20px 0'}}>

      {errorMessage.map((error, index) => (
        <p key={index} style={{ color: "red" }}>
          {error}
        </p>
      ))}

      <form onSubmit={addEntry}>
        <TextField
          label="description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <InputLabel sx={{ marginTop: 2.5 }} htmlFor="date">date</InputLabel>
        <TextField
          fullWidth 
          id='date'
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="specialist"
          fullWidth 
          value={specialist}
          onChange={({target}) => setSpecialist(target.value)}
        />

        <ChooseDiagnosesCodes />

        <InputLabel sx={{ marginTop: 2.5 }}>type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {types.map(typeOption =>
          <MenuItem
            key={typeOption}
            value={typeOption}
          >
            {typeOption
          }</MenuItem>
        )}
        </Select>

        
        {type == 'HealthCheck' && 
          <HealthCheckTypeField 
            healthCheckRating={healthCheckRating} 
            setHealthCheckRating={setHealthCheckRating}
          />
        }
        
        {type == 'Hospital' &&
          <HospitalTypeField 
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        }
        {type == 'OccupationalHealthcare' &&
          <OccupationalHealthcareTypeField 
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd}
          />
        }

        <Button type="submit">Add</Button>
        <Button onClick={() => cleanAllFields()}>Cancel</Button>
      </form>
    </div>
  );
};

export default AddNewEntryForm;