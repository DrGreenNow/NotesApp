import React from 'react';

import './NoteEditor.css';

const DEFAULT_COLOR = 'yellow';

class NoteEditor extends React.Component {
    constructor(props) {
      super(props);
     
      this.state = {
        text: '',
      };
      this.handleTextChange = this.handleTextChange.bind(this);
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
   
export default NoteEditor;