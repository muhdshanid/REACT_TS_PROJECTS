import { Note, Tag } from "../App"
import NoteList from "../components/NoteList"


type Props = {
    availTags: Tag[]
    notes: Note[]
}

const Home = ({availTags, notes}: Props) => {
  return (
    <div>
        <NoteList notes={notes} availTags={availTags}/>
    </div>
  )
}

export default Home