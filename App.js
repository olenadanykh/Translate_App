/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { ConfigData } from './AppConfig';
import Translate from './Content';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      rounds: 0,
      firstTimeInput: '',
      outputText: '',
      inputLn: '',
      outputLn: '',
      img: '',
      count: 0,
      languages: [],
      clickeble: false,

    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchRemainingData = this.fetchRemainingData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRounds = this.handleRounds.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.resultData = [];
    fetch('https://google-translate20.p.rapidapi.com/languages', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': ConfigData.Rapid_API_Key,
        'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ languages: data.data }))

      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { rounds, count } = this.state;
    // console.log('hello from didupdate');
    if (prevState.count !== count) {
      this.interval = setTimeout(() => {
        // console.log('rounds', this.state.rounds, this.state.count);
        if (count < rounds) {
          this.fetchRemainingData();
        } else {
          clearTimeout(this.interval);
        }
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  async fetchData(e) {
    // e.preventDefault();
    const {
      count, inputText, languages, outputText, outputLn,
    } = this.state;
    const ln = Object.keys(languages);
    const randomLn = ln[Math.floor(Math.random() * ln.length)];
    const url = `https://google-translate20.p.rapidapi.com/translate?text=${inputText}&tl=${randomLn}&sl=en`;
    await this.handleImg();
    await fetch((url), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': ConfigData.Rapid_API_Key,
        'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.data.pairs[0].s);
        this.setState({
          outputText: data.data.translation,
          inputLn: 'English',
          outputLn: languages[randomLn],
          count: count + 1,
          outputD: data.data,
        });
        this.resultData.push({
          input: inputText, inputLanguage: 'English', output: data.data.translation, outputLanguage: languages[randomLn],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async fetchRemainingData(e) {
    // e.preventDefault();
    const {
      count, languages, outputText, outputLn, rounds,
    } = this.state;
    const ln = Object.keys(languages);
    let randomLn = '';
    if (count === (rounds - 1)) randomLn = 'en';
    else randomLn = ln[Math.floor(Math.random() * ln.length)];
    const url = `https://google-translate20.p.rapidapi.com/translate?text=${outputText}&tl=${randomLn}&sl=${outputLn}`;

    await fetch((url), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': ConfigData.Rapid_API_Key,
        'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          inputText: outputText,
          outputText: data.data.translation,
          inputLn: outputLn,
          outputLn: languages[randomLn],
          count: count + 1,
        });

        this.resultData.push({
          input: outputText, inputLanguage: outputLn, output: data.data.translation, outputLanguage: languages[randomLn],
        });
      })
      .catch((err) => {
        console.error(err);
      });
    await this.handleImg();
  }

  handleImg(e) {
    const { inputText, count, outputText } = this.state;
    let url = '';
    if (count === 0) url = `https://www.googleapis.com/customsearch/v1?key=${ConfigData.Google_Image_API_Key}&cx=${ConfigData.Google_CX}&q=${inputText}&searchType=image`;
    else url = `https://www.googleapis.com/customsearch/v1?key=${ConfigData.Google_Image_API_Key}&cx=${ConfigData.Google_CX}&q=${outputText}&searchType=image`;
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log('Image', data.items[0].link);
        this.setState({ img: data.items[0].link });
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({
      inputText: event.target.value,
      firstTimeInput: event.target.value,
      rounds: event.target.value,
    });
  }

  handleRounds(event) {
    this.setState({
      rounds: event.target.value,
    });
  }

  handleClick() {
    this.setState({
      clickeble: true,
    });
  }

  render() {
    const {
      inputText, outputText, img, outputLn, inputLn, count, clickeble, firstTimeInput, rounds,
    } = this.state;
    const {
      handleImg, fetchText, handleClick, resultData,
    } = this;
    if (!clickeble) {
      return (
        <div className="app">
          <h1 className="header">
            {' '}
            Randomly Translation App
            <p> Let's see how the same word/text can be changed after number of rounds randomly translating  it.</p>
          </h1>
          <input className="text-input" placeholder="type in English" type="text" value={this.inputText} onChange={this.handleChange} />
          <input className="number-input" placeholder="number of rounds" type="number" value={this.inputText} onChange={this.handleRounds} />
          <button onClick={() => { this.fetchData(); handleClick(); }}> Translate </button>
        </div>
      );
    }
    return (
      <div>
        <div className="page-content">
          <h1 className="header">Let's translate</h1>
          <input className="text-input" placeholder="  enter text" type="text" value={this.inputText} onChange={this.handleChange} />
          <input className="number-input" placeholder="number of rounds" type="number" value={this.inputText} onChange={this.handleRounds} />
          <button onClick={() => { this.fetchData(); }}> Translate </button>
        </div>
        <div className="translate">
          <Translate
            inputText={inputText}
            outputText={outputText}
            outputLn={outputLn}
            inputLn={inputLn}
            img={img}
            handleImg={handleImg}
            fetchText={fetchText}
            count={count}
            firstTimeInput={firstTimeInput}
            rounds={rounds}
            resultData={resultData}

          />
        </div>
      </div>

    );
  }
}
