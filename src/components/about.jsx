import React, { Component } from 'react';

class About extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <p>Desenvolvido por Wellington Carlos Massola</p>
        <p>Foram utilizados: </p>
        <ul>
          <il>
            <p>React</p>
          </il>
          <il>
            <p>Bootstrap</p>
          </il>
          <il>
            <p>
              Função de conversão de xml para json de Stefan Goessner/2006 (licensed under Creative Commons GNU LGPL License)
              https://goessner.net/download/prj/jsonxml/
            </p>
          </il>
        </ul>
        <hr />
      </React.Fragment>
    );
  }
}

export default About;
