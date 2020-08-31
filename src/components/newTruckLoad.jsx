import React, { Component } from 'react';

class NewTruckLoad extends Component {
  render() {
    return (
      <React.Fragment>
        <form className="form-inline small" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                value={this.props.textAreaAddNewTruck}
                // onChange={(evt) => this.handleNewTruckTextAreaOnChange(evt)}
                onChange={(evt) => this.props.onNewTruckTextAreaOnChange(evt)}
                className="form-control"
                aria-describedby="basic-addon1"
              />
              <div className="input-group-append">
                <button className="btn btn-success btn-sm" type="button" onClick={() => this.props.onAddNewTruck(this.props.textAreaAddNewTruck)}>
                  Adicionar Placa
                </button>
                <button className="btn btn-danger btn-sm" type="button" onClick={() => this.props.onRemoveTruck(this.props.textAreaAddNewTruck)}>
                  Remover Placa
                </button>
              </div>
            </div>
          </div>
        </form>
        <form className="form-inline small" onSubmit={(e) => e.preventDefault()}>
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
        <button className="btn btn-primary btn-sm m-1" type="button" onClick={() => this.props.onAddSelectedFilesToTruck(this.props.selectedTruck)}>
          Adicionar notas selecionadas a placa {this.props.selectedTruck == '' ? '...' : this.props.selectedTruck}
        </button>

        <hr />
      </React.Fragment>
    );
  }
}

export default NewTruckLoad;
