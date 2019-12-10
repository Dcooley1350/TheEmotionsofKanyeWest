import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { kanyeMood } from './actions';


function App(props) {
  function handleButtonClick(event){
    console.log(props);
    event.preventDefault();
    props.dispatch(kanyeMood())
  }
  return (
    <div className="App">
      <h1>Check on Kanye's Mood!?</h1>
      <button onClick={handleButtonClick}>what the what?</button>
    </div>
  );
}

const mapStateToProps = state => ({
  kanyeQuotes: state.kanyeQuotes
});

export default connect(mapStateToProps)(App);
