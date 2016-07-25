import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { notecount: 0, searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }
  onInputChange(event) {
    this.setState({ searchterm: event.target.value });
    // this.props.onSearchChange(this.state.searchterm);
    // this.props.onSearchChange = this.props.onSearchChange.bind(this);
    // console.log(event.target.value);
  }
  onAdd(event) {
    // should be sending the info from other event
    this.setState({ notecount: this.state.notecount + 1 });
    // this.props.onNoteAdd(this.state.notecount);
    this.props.onNoteAdd(this.state.searchterm);
    console.log('hi');
    console.log(document.getElementById('input').value);
  }
  render() {
    return (
      <div style={{ margin: 20, borderRadius: 25 }}>
        <input style={{ borderRadius: 10, marginRight: 20, padding: 5 }} placeholder="Note title" onChange={this.onInputChange} id="input" value={this.state.searchterm} />
        <button style={{ borderRadius: 10, padding: 5, backgroundColor: '#ffd27f' }} onClick={this.onAdd}>Create note!</button>
      </div>
    );
  }
}

export default SearchBar;
