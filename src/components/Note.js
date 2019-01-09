import React from 'react';

import './Note.css';

class Note extends React.Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete() {
      this.props.onDelete(this.props.id);
    }
  
    render() {
      const {
        color,
        text,
      } = this.props;
      return (
          <div className="note" style={{ backgroundColor: color}}>
            <span className="note__delete-icon" onClick={this.handleDelete}> x </span>
            {text}
          </div>
      )
    }
};

export default Note;