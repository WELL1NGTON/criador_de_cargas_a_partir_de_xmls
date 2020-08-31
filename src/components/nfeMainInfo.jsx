import React, { Component } from 'react';

class NfeMainInfo extends Component {
  render() {
    return (
      <div className="card m-2 small">
        <label className="btn btn-secondary btn-sm active">
          <input
            type="checkbox"
            checked={this.props.isChecked}
            onChange={(evt) => this.props.onSelectNfe(this.props.xmlObject.nfeProc.NFe.infNFe.ide.nNF)}
            aria-label="Checkbox for following text input"
          />{' '}
          {this.props.xmlObject.nfeProc.NFe.infNFe.ide.nNF}
        </label>

        <div className="card-body small">
          {this.props.xmlObject.truck != null ? (
            <p className="font-weight-bold bg-success text-uppercase large">Veículo: {this.props.xmlObject.truck}</p>
          ) : null}
          <p>Razão Social: {this.props.xmlObject.nfeProc.NFe.infNFe.dest.xNome} </p>
          <p>
            Endereço: {this.props.xmlObject.nfeProc.NFe.infNFe.dest.enderDest.xLgr}, {this.props.xmlObject.nfeProc.NFe.infNFe.dest.enderDest.nro}
            <br />
            {this.props.xmlObject.nfeProc.NFe.infNFe.dest.enderDest.xBairro}
            <br />
            {this.props.xmlObject.nfeProc.NFe.infNFe.dest.enderDest.xMun} - {this.props.xmlObject.nfeProc.NFe.infNFe.dest.enderDest.UF}
            <br />
            CEP: {this.props.xmlObject.nfeProc.NFe.infNFe.dest.enderDest.CEP}
          </p>
          <p>
            Peso Líquido: {this.props.xmlObject.nfeProc.NFe.infNFe.transp.vol.pesoL}
            <br />
            Peso Bruto: {this.props.xmlObject.nfeProc.NFe.infNFe.transp.vol.pesoB}
          </p>
        </div>
      </div>
    );
  }
}

export default NfeMainInfo;
