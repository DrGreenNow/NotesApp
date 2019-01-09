import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Masonry from 'masonry-layout';
import Masonry from 'react-masonry-component';

const DEFAULT_COLOR = 'yellow';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const {
      color,
      text,
      // onDelete
    } = this.props;
    return (
        <div className="note" style={{ backgroundColor: color}}>
          <span className="note__delete-icon" onClick={this.handleDelete}> x </span>
          {text}
        </div>
    )
  }
};


class NoteEditor extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      text: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onNoteAdd = this.handleNoteAdd.bind(this);
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleNoteAdd(){
    const newNote = {
      text: this.state.text,
      id: Date.now(),
      color: DEFAULT_COLOR
    };
    this.props.onNoteAdd(newNote);
    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <div className="editor">
        <textarea 
          rows={5}
          placeholder="Enter your note here.."
          className="editor__textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />

        {this.state.text &&
        <button 
          className="editor__button"
          onClick={this.handleNoteAdd}
          >Add
        </button>
        }
      </div>
    )
  }
};
 

class NotesGrid extends Component {

  // componentDidMount() {
  //   const grid = this.grid;

  //   this.msnry = new Masonry(grid, {
  //       columnWidth: 240,
  //       gutter: 10,
  //       isFitWidth: true
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.notes !== this.props.notes) {
  //   this.msnry.reloadItems();
  //   this.msnry.layout();
  //   }
  // }

  render() {
    const { 
      notes,
      onNoteDelete 
    } = this.props;

    const masonryOptions = {
      columnWidth: 250,
      gutter: 10,
      isFitWidth: true
    };

    return (
      // <div className="grid" ref={c => this.grid = c}>
      //   {
      //     notes.map(note =>
      //       <Note 
      //         key={note.id}
      //         text={note.text}
      //         color={note.color}
      //         onDelete={onNoteDelete}
      //         id={note.id}
      //       />
      //     )
      //   }
      // </div>
      <Masonry
        className='grid'
        options={masonryOptions}
      >
        {
          notes.map(note =>
            <Note
              key={note.id}
              id={note.id}
              color={note.color}
              onDelete={onNoteDelete}
              text={note.text}
            >
              {/* {note.text} */}
            </Note>
          )
        }
      </Masonry>
    )
  }
}; 


class NotesApp extends Component {
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

var destination = document.querySelector("#container");
  
ReactDOM.render(<NotesApp />, destination);
