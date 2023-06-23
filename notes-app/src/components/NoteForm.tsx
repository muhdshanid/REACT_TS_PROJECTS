import  { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from '../App'
import {v4 as uuidV4} from 'uuid'

type Props = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({onSubmit, availTags, onAddTag, title, markdown, tags = []}: Props) => {
    const navigate = useNavigate()
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const titleRef = useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markDownRef.current!.value,
            tags: selectedTags
        })
        navigate("..")
    }
  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId='title'>
                    <Form.Label>
                        Title
                    </Form.Label>
                    <Form.Control defaultValue={title} ref={titleRef} required/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='tags'>
                    <Form.Label>
                        Tags
                    </Form.Label>
                    <CreatableReactSelect 
                    onCreateOption={label => {
                        const newTag = {id: uuidV4(), label}
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                    }}
                     value={selectedTags.map(tag => {
                        return {
                            label: tag.label,
                            value: tag.id
                        }
                    })} 
                    onChange={tags => {
                        setSelectedTags(tags.map(tag => {
                            return {
                                label: tag.label,
                                id: tag.value
                            }
                        }))
                    }}
                    options={availTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })}
                    isMulti/>
                </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId='markdown'>
                    <Form.Label>
                        Body
                    </Form.Label>
                    <Form.Control defaultValue={markdown} ref={markDownRef} required as={"textarea"} rows={15}/>
                </Form.Group>
                <Stack direction='horizontal' className='justify-content-end'>
                    <Button variant='primary' type='submit'>Save</Button>
                    <Link to={".."}>
                    <Button variant='outline-secondary' type='button'>Cancel</Button>
                    </Link>
                </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm