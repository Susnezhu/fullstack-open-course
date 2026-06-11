import axios from 'axios'

import type {DiaryEntry, NewDiaryEntry} from '../../../backend/src/types'

const baseUrl = 'http://localhost:3000'

const getAll = async () => {
  return axios
    .get(baseUrl + '/api/diaries')
    .then(response => response.data)
}

const create = async (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl + '/api/diaries', object)
    .then(response => response.data)
}



export default { getAll, create }
