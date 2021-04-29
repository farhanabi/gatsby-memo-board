import React, { useEffect, useState } from 'react'
import '@fontsource/open-sans'
import '@fontsource/nunito'

import Note from '../components/Note'
import useLocalStorage from '../hooks/useLocalStorage'
import ideaService from '../services/ideas'
import '../styles/index.scss'

// Initial ideas data
const data = [
  {
    id: 1,
    created_date: new Date(),
    title: 'Title 1',
    body: 'Description 1'
  },
  {
    id: 2,
    created_date: new Date(),
    title: 'Title 2',
    body: 'Description 2'
  },
  {
    id: 3,
    created_date: new Date(),
    title: 'Title 3',
    body: 'Description 3'
  }
]

const IndexPage = () => {
  // Initiate notesData from localStorage
  const [notesData, setNotesData] = useLocalStorage('notes', data)

  // Initiate state, sortBy, and sortType state
  const [alert, setAlert] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortType, setSortType] = useState('ascending')

  // Fetch data from the REST endpoint
  useEffect(() => {
    // Get the existing ideas data from endpoint
    ideaService
      .getAll()
      .then(response => {
        // // This should be // //
        // setNotesData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // Set alert timeout
  useEffect(() => {
    if (alert) {
      // Set alert timeout for 3 seconds
      const alertTime = setTimeout(() => {
      // After 3 seconds set the alert value to ''
        setAlert('')
      }, 3000)

      return () => {
        clearTimeout(alertTime)
      }
    }
  }, [alert])

  // Sort data when there is a change on notesData, sortBy, or sortType
  useEffect(() => {
    sortData(sortBy, sortType)
  }, [notesData, sortBy, sortType])

  // Sort data handler
  const sortData = (sb, st) => {
    if (sb === 'date') {
      if (st === 'ascending') {
        setNotesData(notesData.sort((a, b) => a.created_date > b.created_date))
      } else if (st === 'descending') {
        setNotesData(notesData.sort((a, b) => a.created_date < b.created_date))
      }
    } else if (sb === 'title') {
      if (st === 'ascending') {
        setNotesData(notesData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase()))
      } else if (st === 'descending') {
        setNotesData(notesData.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase()))
      }
    }
  }

  // Add new idea note handler
  const handleAddNotes = () => {
    // Get the maximum number of ID
    const maxID = Math.max.apply(Math, notesData.map(o => o.id))
    const newIdea = {}

    // Get new idea data from endpoint
    ideaService
      .getNew()
      .then(response => {
        // // This should be // //
        // newIdea = response.data
      })
      .catch(error => {
        console.log(error)
      })

    // Create new note
    const newNote = {
      id: newIdea.id || maxID + 1,
      created_date: newIdea.created_date || new Date(),
      title: '',
      body: ''
    }

    // Append new note to idea notes data
    setNotesData([...notesData, newNote])
  }

  // Update idea note handler
  const handleUpdateNotes = data => {
    // Get new notes by changing the notes data by id
    const newNotes = notesData.map(note => note.id === data.id ? data : note)

    // Update idea notes data to endpoint
    ideaService
      .updateIdea(data)
      .then(response => {
        // // This should be // //
        // setNotesData(newNotes)
        // setAlert('Your edits have been successfully saved')
      })
      .catch(error => {
        console.log(error)
      })

    setNotesData(newNotes)
    setAlert('Your edits have been successfully saved')
  }

  // Delete idea note handler
  const handleDeleteNotes = id => {
    // Get new notes by filtering notes id
    const newNotes = notesData.filter(note => note.id !== id)

    // Send delete idea note data
    ideaService
      .deleteIdea({ id })
      .then(response => {
        // // This should be // //
        // setNotesData(newNotes)
      })
      .catch(error => {
        // set notes data on error because the api is not working
        setNotesData(newNotes)
        console.log(error)
      })

    setNotesData(newNotes)
  }

  // Change 'sort by' selector handler
  const handleChangeSortBy = event => {
    const sort = event.target.value
    setSortBy(sort)
    sortData(sort, sortType)
  }

  // Change 'sort type' selector handler
  const handleChangeSortType = event => {
    const sort = event.target.value
    setSortType(sort)
    sortData(sortBy, sort)
  }

  // Close alert button handler
  const handleCloseAlert = () => {
    setAlert('')
  }

  return (
    <container className="main-container">
      <title>Memoboard</title>
      <div className="sort-container">
        <label htmlFor="sort-by">Sort by</label>
        <select name="sort-by" id="sort-by" value={sortBy} onChange={handleChangeSortBy}>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
        <select name="sort-type" id="sort-type" value={sortType} onChange={handleChangeSortType}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="notes-container">
        {notesData.length > 0 && notesData.map(note => (
          <Note
            key={note.id}
            note={note}
            handleUpdateNotes={handleUpdateNotes}
            handleDeleteNotes={handleDeleteNotes}
          />
        ))}
        <div className="add-button" onClick={handleAddNotes}>+</div>
      </div>
      {alert && <div className="alert-box">
        <span className="close-button" onClick={handleCloseAlert}>&times;</span>
        {alert}
      </div>}
    </container>
  )
}

export default IndexPage
