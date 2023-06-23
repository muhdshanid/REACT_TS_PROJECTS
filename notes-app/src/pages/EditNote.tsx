import { NoteData, Tag } from "../App"
import NoteForm from "../components/NoteForm"
import { useNote } from "../hooks/useLocalStorage"

type Props = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availTags: Tag[]
}
const EditNote = ({onSubmit, onAddTag, availTags}: Props) => {
  const note = useNote()
  return (
    <>
    <h1 className="mb-4">
        Edit Note
    </h1>
    <NoteForm
    title={note.title} markdown={note.markdown} tags={note.tags}
     onAddTag={onAddTag} availTags={availTags} onSubmit={data => onSubmit(note.id, data)}/>
    </>
  )
}

export default EditNote