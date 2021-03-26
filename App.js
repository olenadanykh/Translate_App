/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Translate from './Content';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
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
    this.handleImg = this.handleImg.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('https://google-translate20.p.rapidapi.com/languages', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'YOUR_API_KEY',
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
    // console.log('hello from didupdate');
    if (prevState.count !== this.state.count) {
      this.interval = setInterval(() => {
        if (this.state.count === 5) {
          clearInterval(this.interval);
        } else {
          this.fetchRemainingData();
          // this.handleImg();
        }
      }, 8000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        'x-rapidapi-key': 'YOUR_API_KEY',
        'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          outputText: data.data.translation,
          inputLn: 'English',
          outputLn: languages[randomLn],
          count: count + 1,
          outputD: data.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async fetchRemainingData(e) {
    // e.preventDefault();
    const {
      count, inputText, languages, outputText, outputLn,
    } = this.state;
    const ln = Object.keys(languages);
    let randomLn = '';
    if (count === 4) randomLn = 'en';
    else randomLn = ln[Math.floor(Math.random() * ln.length)];
    const url = `https://google-translate20.p.rapidapi.com/translate?text=${outputText}&tl=${randomLn}&sl=${outputLn}`;

    await fetch((url), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'YOUR_API_KEY',
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
      })
      .catch((err) => {
        console.error(err);
      });
    await this.handleImg();
  }

  handleImg(e) {
    const { inputText, count, outputText } = this.state;
    let url = '';
    if (count === 0) url = `https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_CX&q=${inputText}&searchType=image`;
    else url = `https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_CX&q=${outputText}&searchType=image`;
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
    });
  }

  handleClick() {
    this.setState({
      clickeble: true,
    });
  }

  render() {
    console.log(this.state);
    const {
      inputText, outputText, img, outputLn, inputLn, count, clickeble, firstTimeInput,
    } = this.state;
    const { handleImg, fetchText, handleClick } = this;
    if (!clickeble) {
      return (
        <div className="app">
          <h1 className="header">
            {' '}
            Do you know what the same word means in different languages?
            <p> ... let’s discover</p>
          </h1>
          <input placeholder="type in English" type="text" value={this.inputText} onChange={this.handleChange} />
          <button onClick={() => { this.fetchData(); handleClick(); }}> Translate </button>
        </div>
      );
    }
    return (
      <div className="app">
        <h1 className="header">Let's translate</h1>
        <input placeholder="  enter text" type="text" value={this.inputText} onChange={this.handleChange} />
        <button onClick={() => { this.fetchData(); }}> Translate </button>
        <div>
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

          />
        </div>
      </div>

    );
  }
}
