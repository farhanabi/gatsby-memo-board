import React from 'react'
import renderer from 'react-test-renderer'

import Note from '../../components/Note'

const data = {
  id: 1,
  created_date: new Date(),
  title: 'Title 1',
  body: 'Description 1'
}

describe('Note', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Note note={data} handleUpdateNotes={() => {}} handleDeleteNotes={() => {}}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
