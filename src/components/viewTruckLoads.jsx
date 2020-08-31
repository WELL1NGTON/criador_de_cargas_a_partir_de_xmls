import React, { Component } from 'react';

class ViewTruckLoads extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <form className="form-inline small" onSubmit={(e) => e.preventDefault()}>
          <button className="btn btn-primary btn-sm m-1" type="button" onClick={() => this.props.onShowClassifiedFiles(this.props.selectedTruck)}>
            Exibir notas vinculadas a placa {this.props.selectedTruck == '' ? '...' : this.props.selectedTruck}
          </button>
          <div className="form-group">
            <div className="dropdown open">
              <button
                className="btn btn-secondary dropdown-toggle btn-sm m-1"
                type="button"
                id="dropdownMenu5"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.selectedTruck.length == 0 ? 'Selecione Uma Placa:' : this.props.selectedTruck}
              </button>
              <div className="dropdown-menu">
                {this.props.trucks.map((truck) => (
                  <a
                    className="dropdown-item"
                    key={truck}
                    onClick={() => {
                      this.props.onSelectTruck(truck);
                    }}
                  >
                    {truck}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </form>
        <form className="form-inline small" onSubmit={(e) => e.preventDefault()}>
          <button className="btn btn-success btn-sm m-1" type="button" onClick={() => this.props.onShowAllFiles(this.props.onShowAllFiles)}>
            Exibir todas as notas
          </button>
          <button className="btn btn-success btn-sm m-1" type="button" onClick={() => this.props.onShowUnclassifiedFiles(this.props.onShowUnclassifiedFiles)}>
            Exibir notas não vinculadas
          </button>
        </form>
        <form className="form-inline small" onSubmit={(e) => e.preventDefault()}>
          <button className="btn btn-warning btn-sm m-1" type="button" onClick={() => this.props.onShowClassifiedFiles(this.props.selectedTruck)}>
            Desvincular notas selecionadas da placa {this.props.selectedTruck == '' ? '...' : this.props.selectedTruck}
          </button>
          <button className="btn btn-danger btn-sm m-1" type="button" onClick={() => this.props.onShowClassifiedFiles(this.props.selectedTruck)}>
            Desvincular todas notas da placa {this.props.selectedTruck == '' ? '...' : this.props.selectedTruck}
          </button>
        </form>
        <hr />
      </React.Fragment>
    );
  }
}

export default ViewTruckLoads;
