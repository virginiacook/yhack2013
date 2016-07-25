import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
// import debounce from 'lodash.debounce';
import Note from './components/note';
import Immutable from 'immutable';
import Dimensions from 'react-dimensions';


// import './style.scss';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      searchterm: 'hello',
      highestZ: 0,
    };
    // this.search = debounce(this.search, 300);

    this.delete = this.delete.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateZ = this.updateZ.bind(this);
  }

  // adding a note -- text is title
  create(text) {
    const note = {
      title: text,
      x: 20,
      y: 10,
      zIndex: this.state.highestZ + 1,
      width: 200,
      height: 150,
      text: '',
    };
    this.state.highestZ++;
    this.setState({
      notes: this.state.notes.set(text, note),
    });
  }
  // UPDATE note
  updateNote(id, field) {
    this.setState({
      // change z index here
      // empty object and create new object
      // call field with {text: 'hello'} as fields, an object not text
      notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, field); }),
    });
  }

  updateZ(id, note1) {
    console.log('currentZ' + note1.zIndex);
    console.log('highestZ' + this.state.highestZ);
    if (note1.zIndex < this.state.highestZ) {
      console.log('delete and create');
      this.state.highestZ += 100;
      this.setState({
        notes: this.state.notes.delete(id),
      });
      const note2 = {
        title: note1.title,
        x: note1.x,
        y: note1.y,
        zIndex: this.state.highestZ,
        width: note1.width,
        height: note1.height,
        text: note1.text,
      };
      this.setState({
        notes: this.state.notes.set(id, note2),
      });
      // this.setState({
      // //   // change z index here
      // //   // empty object and create new object
      // //   // call field with {text: 'hello'} as fields, an object not text
      //   notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, { zIndex: this.state.highestZ }); }),
      // });
    }
  }

  delete(id) {
    console.log('delete note with id' + id);
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }
  renderNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
  // perhaps you might return some jsx here :-)
      return <Note id={id} note={note} onNoteDelete={this.delete} updateNote={this.updateNote} changeZ={this.updateZ} key={id} />;
    });
  }
  render() {
    return (
      <div id="searchbar" style={{ height: this.props.containerHeight, width: this.props.containerWidth }}>
        <SearchBar onNoteAdd={text => this.create(text)} />
        {this.renderNotes()}
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('main'));
