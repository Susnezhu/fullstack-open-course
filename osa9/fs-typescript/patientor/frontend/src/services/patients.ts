import axios from "axios";
import { Entry, Patient, PatientFormValues, NewEntryValuest } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/api/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/api/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );

  return data;
};

const newEntry = async (object: NewEntryValuest, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/api/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, create, getById, newEntry
};

