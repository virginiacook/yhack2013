import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    // can call props.note.title
    super(props);
    // note = {}
    // this.state = { id: 0, title: props.note.title, text: 'I is a note', width: 400, height: 100, zIndex: 26, x: 20, y: 20, isEditing: false };
    this.state = { isEditing: false, opacity: 0.8 };

    this.onInputChange = this.onInputChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    // this.state.title = props.title;
    // this.setState({ title: props.title });
  }
  onInputChange(event) {
    // this.props.onSearchChange(this.state.searchterm);
    // this.props.onSearchChange = this.props.onSearchChange.bind(this);

    // SEND TO UPDATE
    // this.setState({ text: event.target.value });
    // this.setState({ text: event.target.value });
    // console.log(this.state.text);
    // console.log(event.target.value);
    this.props.updateNote(this.props.id, { text: event.target.value });
    // this.props.changeZ(this.props.id, this.props.note.zIndex);
  }

  onDrag(e, ui) {
    console.log('dragging');
    // TODO CALL UPDATE METHOD
    this.setState({ opacity: 1.0 });
    // this.props.changeZ(this.props.id, this.props.note);
    this.props.updateNote(this.props.id, { x: ui.x, y: ui.y });
    // this.props.changeZ(this.props.id, this.props.note);
    // this.state.x = ui.x;
    // this.state.y = ui.y;
  }

  onStartDrag() {
    this.props.changeZ(this.props.id, this.props.note);
    console.log('start dragging');
  }
  onStopDrag() {
    this.setState({ opacity: 0.8 });
    console.log('stop dragging');
    // this.state.x = ui.x;
    // this.state.y = ui.y;
  }
  onEdit() {
    console.log('edit');
    this.props.changeZ(this.props.id, this.props.note);
    // this.isEditing = this.onEdit.bind(this);
    // this.setState({ isEditing: true });
    this.setState({ opacity: 1.0 });
    this.setState({ isEditing: true });
    console.log(this.state.isEditing);
  }
  onSave(isEditing) {
    console.log('save');
    // console.log(this.state.isEditing);
    // this.props.isEditing = this.onSave.bind(this);
    this.setState({ opacity: 0.8 });
    this.setState({ isEditing: false });
    console.log(this.state.isEditing);
  }
  onDelete() {
    this.props.onNoteDelete(this.props.id);
  }
  renderCheckEdit() {
    if (this.state.isEditing) {
      return <i onClick={this.onSave} className="fa fa-check" />;
    } else {
      return <i onClick={this.onEdit} className="fa fa-pencil" />;
    }
  }
  renderSomeSection() {
    if (this.state.isEditing) {
      return <Textarea onChange={this.onInputChange} id="editing" style={{ width: this.props.note.width - 20 }}>{this.props.note.text}</Textarea>;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }
  render() {
    return (
      <Draggable
        handle=".handle2"
        grid={[25, 25]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div style={{ opacity: this.state.opacity, color: 'white', background: 'url(http://df19a4497e496705eb6e-23dfa51229e157ae4289090a560c4268.r88.cf2.rackcdn.com/product-original-56595-12865-1350598622-0408d97269da41196693f1ce090726c6.JPG)', borderRadius: 10, padding: 10, height: 'auto', width: this.props.note.width, zIndex: this.props.note.zIndex, backgroundColor: 'purple' }}>
          <div id="block_container" style={{ display: 'flex', justifyContent: 'space-between', width: this.props.note.width - 22 }} >
            <div style={{ display: 'inline-block' }}><div style={{ display: 'inline-block', paddingRight: 10 }}>{this.props.note.title}</div><div style={{ display: 'inline-block', paddingRight: 10 }}><i onClick={this.onDelete} className="fa fa-trash-o" /></div>
              {this.renderCheckEdit()}
            </div>
            <div><i className="fa fa-arrows-alt handle2" /></div>
          </div>
          <div>
            {this.renderSomeSection()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
