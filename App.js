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
      outputText: '',
      inputLn: '',
      outputLn: '',
      img: '',
      count: 0,
      languages: [],
      clickeble: false,
    };
    this.fetchText = this.fetchText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { count } = this.state;
    if (count !== 5) this.setState({ count: count + 1 });

    fetch('https://google-translate20.p.rapidapi.com/languages', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '38e57b41b5mshb118bafd5b093b1p1b14f7jsn1054fbef5a13',
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
    if (prevState.count !== this.state.count) {
      this.interval = setInterval(() => {
        if (this.state.count >= 5) clearInterval(this.interval);
        else {
          this.fetchText();
        }
      }, 8000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchText(e) {
    // e.preventDefault();
    const {
      count, inputText, languages,
    } = this.state;
    const ln = Object.keys(languages);
    const randomLn = ln[Math.floor(Math.random() * ln.length)];
    fetch(`https://google-translate20.p.rapidapi.com/translate?text=${inputText}&tl=${randomLn}&sl=en`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '38e57b41b5mshb118bafd5b093b1p1b14f7jsn1054fbef5a13',
        'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          // inputText: outputText,
          outputText: data.data.translation,
          inputLn: 'English',
          outputLn: languages[randomLn],
          count: count + 1,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }


  handleImg(e) {
    const { inputText } = this.state;
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyA80SEzx6zaniPCTWk_D5FLm4JkHmnajt8&cx=4c16a0db4570f0d5d&q=${inputText}&searchType=image`)
      .then(res => res.json())
      .then(data => this.setState({ img: data.items[0].link }))
      .catch(err => console.log(err));
  }

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({
      inputText: event.target.value,
    });
  }

  handleClick() {
    this.setState({
      clickeble: true,
    });
  }


  render() {
    console.log('state', this.state);
    const {
      inputText, outputText, img, outputLn, inputLn, count, clickeble,
    } = this.state;
    const { handleImg, fetchText, handleClick } = this;
    if (!clickeble) {
      return (
        <div className="app">
          <h1 className="header">Let's translate</h1>
          <input placeholder="  enter text" type="text" value={this.inputText} onChange={this.handleChange} />
          <button onClick={() => { fetchText(); handleClick(); handleImg(); }}> Translate </button>
        </div>
      );
    }
    return (
      <div className="app">
        <h1 className="header">Let's translate</h1>
        <input placeholder="  enter text" type="text" value={this.inputText} onChange={this.handleChange} />
        <button onClick={() => { fetchText(); handleImg(); }}> Translate </button>
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

          />
        </div>
      </div>

    );
  }
}
