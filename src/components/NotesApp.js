import React from "react";

import NoteEditor from './NoteEditor';
import NotesGrid from './NotesGrid';
import './NotesApp.css';

export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        notes: []
      };
      this.handleNoteAdd = this.handleNoteAdd.bind(this);
      this.handleNoteDelete = this.handleNoteDelete.bind(this);
  }

  componentDidMount() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));

    if(savedNotes) {
      this.setState({ notes: savedNotes});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.notes !== this.state.notes) {  
      this.saveToLocalStorage();
    }
  }

  handleNoteAdd(newNote) {
    this.setState({
      notes: [newNote, ...this.state.notes]
    });
  }

  saveToLocalStorage() {
    const notes = JSON.stringify(this.state.notes);

    localStorage.setItem('notes', notes);
  }

  handleNoteDelete(noteId) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  render() {
    return (
      <div className="app">
        <h2 className="app__header">NotesApp</h2>
        <NoteEditor 
          onNoteAdd={this.handleNoteAdd} />
        <NotesGrid 
          notes={this.state.notes} 
          onNoteDelete={this.handleNoteDelete}/>
      </div>
    )
  }
}; 

