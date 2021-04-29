import axios from 'axios'

// Base REST API URL
const baseUrl = '/api'

// GET ideas
const getAll = () => axios.get(`${baseUrl}/ideas`)

// GET ideas/new
const getNew = () => axios.get(`${baseUrl}/ideas/new`)

// POST idea/update
const updateIdea = (data) => axios.post(`${baseUrl}/idea/update`, data)

// POST idea/delete
const deleteIdea = (data) => axios.post(`${baseUrl}/idea/delete`, data)

export default { getAll, getNew, updateIdea, deleteIdea }
