import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import deleteIcon from '../images/delete.svg'

const Note = ({ note, handleUpdateNotes: updateNotes, handleDeleteNotes: deleteNotes }) => {
  // Initiate title and body state
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)

  // Use ref for title input
  const inputRef = useRef(null)

  // Set maximum allowed character
  const maxChar = 140

  // Set focus on title when create new notes
  useEffect(() => {
    if (!note.title) {
      inputRef.current.focus()
    }
  }, [])

  // Set idea note title handler
  const handleTitleChange = event => {
    // Slice title string to only 140 characters
    const processedTitle = event.target.value.substring(0, maxChar)
    setTitle(processedTitle)
  }

  // Set idea note body handler
  const handleBodyChange = event => {
    // Slice body string to only 140 characters
    const processedBody = event.target.value.substring(0, maxChar)
    setBody(processedBody)
  }

  // Update idea note handler
  const handleUpdateNotes = () => {
    // Handle update idea note using note id, title, and body
    if (note.title !== title || note.body !== body) {
      const reqBody = {
        ...note,
        title,
        body
      }
      updateNotes(reqBody)
    }
  }

  // Delete idea note handler
  const handleDeleteNotes = () => {
    // Handle delete idea note using note ID
    deleteNotes(note.id)
  }

  // Count remaining characters
  const remainingChar = maxChar - body.length

  return (
    <div className="note">
      <div className="note-inner">
        <textarea className="note-title" value={title} onChange={handleTitleChange} onBlur={handleUpdateNotes} ref={inputRef} />
        <textarea className="note-body" value={body} onChange={handleBodyChange} onBlur={handleUpdateNotes} />
      </div>
      {remainingChar <= 15 && (
        <p className="char-left">{remainingChar} chars left</p>
      )}
      <img className="delete-icon" src={deleteIcon} alt="Delete note" onClick={handleDeleteNotes} />
    </div>
  )
}

// Props type
Note.propTypes = {
  note: PropTypes.object,
  handleUpdateNotes: PropTypes.func.isRequired,
  handleDeleteNotes: PropTypes.func.isRequired
}

export default Note
