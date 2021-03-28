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
      count,
      firstTimeInput,
      rounds,
      resultData,
    } = this.props;
    let hasBeenChanged = '';
    if (firstTimeInput === outputText.toLowerCase()) hasBeenChanged = 'still';
    else hasBeenChanged = 'has been changed to';
    const resData = resultData.map((el, i) => (
      <li key={i}>
        {el.input}
        (
        {el.inputLanguage}
        )
        {'  -->  '}
        {el.output}
        (
        {el.outputLanguage}
        )
      </li>
    ));

    console.log(resData, resultData, 'RESDATA');
    if (count === Number(rounds)) {
      return (
        <div className="content">
          <div className="row">
            <h1 className="column">
              {inputText}
              <p>{inputLn}</p>
            </h1>
            <ul className="column">
              {resData}
            </ul>
            {/* <li>{lastEl}</li> */}
            <h1 className="column">
              {outputText}
              <p>{outputLn}</p>
            </h1>
          </div>
          <h2 className="contentoutput">
            After
            {' '}
            {rounds}
            {' '}
            rounds of randomly translating, input
            {' '}
            {firstTimeInput.toUpperCase()}
            {' '}
            {hasBeenChanged}
            {' '}
            {outputText.toUpperCase()}
          </h2>
          <div className="image">
            <img
              src={img}
              alt=""
            />
          </div>
        </div>

      );
    }
    return (
      <div className="content">
        <div className="row">
          <h1 className="column">
            {inputText}
            <p>{inputLn}</p>
          </h1>
          <ul className="column">
            {resData}
          </ul>
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
