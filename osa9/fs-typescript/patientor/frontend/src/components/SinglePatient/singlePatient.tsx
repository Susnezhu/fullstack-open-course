import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Patient, Diagnosis } from '../../types';
import patientService from "../../services/patients";
import diagnosService from "../../services/diagnoses";

import EntryDetails from "./EntryDetails";

import { Button } from '@mui/material';

import AddNewEntryForm from './AddNewEntryForm';

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnose] = useState<Diagnosis[]>();

  const [entryFormSetting, setEntryFormSetting] = useState(false);

  const { id }= useParams();

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    const fetchDiagnos = async () => {
      const diagnoses = await diagnosService.getAll();
      setDiagnose(diagnoses);
    };

    void fetchPatient();
    void fetchDiagnos();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const genderIcon = {
    female: '♀️',
    male: '♂️',
    other: '⚲'
  };

  const toggleFormOpen = () => {
    if (entryFormSetting) {
      setEntryFormSetting(false);
    } else {
      setEntryFormSetting(true);
    }
  };
  

  return (
    <div>
    <h2>{patient?.name} {patient && genderIcon[patient.gender]}</h2>
    <p>ssn: {patient?.ssn}</p>
    <p>occupation: {patient?.occupation}</p>
    
    <h2>Entries</h2>
    <Button variant="contained" onClick={() => toggleFormOpen()}>{entryFormSetting ? 'Close form' : 'Add new entry'}</Button>
    { entryFormSetting ? 
      <AddNewEntryForm personId={patient.id}/> :
      ''
    }

    {patient?.entries.map(entry => (
      <EntryDetails entry={entry} diagnoses={diagnoses}/>
    ))}
    </div>
  );
};

export default SinglePatient;
