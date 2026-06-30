import type { Entry, Diagnosis } from '../../types';
import { HealthCheckRating } from '../../types';

import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheck = ({rating}: {rating: number}) => {
  switch (rating) {
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{color: 'red'}}/>;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{color: 'orange'}}/>;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{color: 'yellow'}}/>;
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{color: 'green'}}/>;
    default:
      return '';
  }
};

const OccupationalHealthcare = ({name, sickLeave}: {name: string, sickLeave?: {startDate: string,endDate: string}}) => {
 return (
  <div>
    <p><WorkIcon /> {name}</p>
    {sickLeave && (
      <div>
        <p>Sick Leave: {sickLeave.startDate} - {sickLeave.endDate}</p>
      </div>
    )}
    
  </div>
 );
};

const Hospital = ({discharge}: {discharge: {date: string, criteria: string}}) => {
 return (
  <p>discharge: {discharge.date} - {discharge.criteria}</p>
 );
};

const EntryDetails = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[] | undefined}) => {
  const entryScenarios = () => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheck rating={entry.healthCheckRating}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare name={entry.employerName} sickLeave={entry.sickLeave}/>;
      case "Hospital":
        return <Hospital discharge={entry.discharge}/>;
      default:
        return '';
    }
  };
  

return (
  <div key={entry.id}>
    <div style={{border: '2px solid black', padding: '10px', borderRadius: '10px', margin: '10px'}}>
      <p>{entry.date} </p>
      {entry.type === 'OccupationalHealthcare' ? entryScenarios() : <MedicalServicesIcon />}
      <p>{entry.description}</p>
      {entry.type === 'HealthCheck' ? entryScenarios() : ''}
      <ul>
      {entry.diagnosisCodes?.map(code => (
        <li key={code}>{code} - {diagnoses?.find(diagnos => diagnos.code === code)?.name}</li>
      ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
      {entry.type === 'Hospital' ? entryScenarios() : ''}
    </div>
  </div>
  );
};


export default EntryDetails;