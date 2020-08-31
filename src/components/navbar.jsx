import React, { Component } from 'react';

class NavBar extends Component {
  state = {
    selectedFile: '',
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        {/* <a className="navbar-brand" href="#">
          Navbar
        </a> */}
        <div>
          <label className="btn btn-primary btn-sm m-1">
            Importar XMLs
            <input
              type="file"
              id="fileElem"
              multiple
              accept=".xml"
              // onchange="handleFiles(this.files)"
              onChange={(evt) => this.props.onFilesSelected(evt.target.files)}
              className="filestyle"
              input="false"
              hidden
            />
          </label>

          <button type="button" className="btn btn-warning btn-sm m-1" onClick={(evt) => this.props.onClearFiles()}>
            Remover XMLs
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
