import { NoteData, Tag } from "../App"
import NoteForm from "../components/NoteForm"

type Props = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availTags: Tag[]
}
const NewNote = ({onSubmit, onAddTag, availTags}: Props) => {
  return (
    <>
    <h1 className="mb-4">
        New Note
    </h1>
    <NoteForm onAddTag={onAddTag} availTags={availTags} onSubmit={onSubmit}/>
    </>
  )
}

export default NewNote