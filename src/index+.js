import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// const NOTES = [{ id: 1, color: 'yellow', text: 'Hey! I am the first note here!'}];

class Note extends Component {
  render() {
    const {
      color,
      children,
      onDelete
    } = this.props;
    return (
        <div className="note" style={{ backgroundColor: color}}>
          {children}
        </div>
    )
  }
};

class NoteEditor extends Component {
  render() {
    return (
      <div className="editor">
        <textarea 
          rows={5}
          placeholder="Enter your note here.."
          className="editor__textarea"
        />

        <button className="editor__button">Add</button>
      </div>
    )
  }
};
 
class NotesGrid extends Component {
    render() {
      const { 
        notes 
      } = this.props;
      return (
        <div className="grid">
            {
              notes.map(note =>
                <Note 
                  key={note.id}
                  text={note.text}
                  color={note.color}
                 />
                )
            }
        </div>
      )
    }
  }; 

class NotesApp extends Component {
    constructor(props) {
      super(props);
     
      this.state = {
        notes: [{ id: 1, color: 'yellow', text: 'Hey! I am the first note here!'}]
      };
    }

    getInitialState(){
        return {
            notes: [{ id: 1, color: 'yellow', text: 'Hey! I am the first note here!'}]
        };
    }

    render() {
      return (
          <div className="app">
            <h2 className="app__header">NotesApp</h2>
            <NoteEditor />
            <NotesGrid notes={this.state.notes} />
          </div>

      )
    }
  }; 

var destination = document.querySelector("#container");
  
ReactDOM.render(<NotesApp />, destination);
