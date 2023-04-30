import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from "../context/notes/noteContext";
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';
import { useHistory } from 'react-router-use-history';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    const history=useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        // ref.toggle();
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
        
    }
    const ref = useRef(null);
    const refClose=useRef(null);
    const handleClick=(e)=>{
        props.showAlert("Updated Successfully","success");
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNotes showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle<5 || note.edescription<5} onClick={handleClick} type="button" className="btn btn-primary">Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length===0 && "No Notes to Display"} 
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;