/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './Content.css';

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      inputText,
      outputText,
      img,
      outputLn,
      inputLn,
    } = this.props;

    return (
      <div className="content">
        <div className="row">
          <h1 className="column">
            {inputText}
            <p>{inputLn}</p>
          </h1>
          <h1 className="column">
            {outputText}
            <p>{outputLn}</p>

          </h1>
        </div>
        <div className="image">
          <img
            src={img}
          />
        </div>
      </div>

    );
  }
}
