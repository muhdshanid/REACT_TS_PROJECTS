import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Container } from "react-bootstrap"
import { useMemo, useState } from "react"
import { useLocalStorage } from "./hooks/useLocalStorage"
import {v4 as uuidV4} from 'uuid'
import NewNote from "./pages/NewNote"
import NoteLayout from "./components/NoteLayout"
import Note from "./pages/Note"
import EditNote from "./pages/EditNote"


export type  Note = NoteData & {
  id: string
}
export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}
export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type RawNote = {
  id: string,
 
} & RawNoteData

export type Tag = {
  id: string,
  label: string
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES",[])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS",[])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[notes, tags])

  const onCreateNote = ({tags, ...data}: NoteData) => {
    setNotes(prev => {
      return [...prev, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

   const onDeleteNote = (id: string) => {
    setNotes(pre => {
      return pre.filter(note => note.id !== id)
    })
  }

 function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }
  return (
    <Container className="my-4">
        <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home notes={notesWithTags} availTags={tags}/>}/>
    <Route path="/new" element={<NewNote availTags={tags} onAddTag={addTag} onSubmit={onCreateNote}/>}/>
    <Route path="*" element={<Navigate to={"/"}/>}/>
    <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
      <Route index element={<Note deleteNote={onDeleteNote}/>}/>
      <Route path="edit" element={<EditNote  availTags={tags} onAddTag={addTag} onSubmit={onUpdateNote}/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
    </Container>
  )
}

export default App
