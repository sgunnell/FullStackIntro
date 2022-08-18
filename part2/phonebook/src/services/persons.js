import axios from 'axios'
const baseUrl = 'https://evening-forest-18761.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data);

}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}



export default { getAll,create,deletePerson,update}