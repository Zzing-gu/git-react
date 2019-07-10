import React from 'react';
import logo from './logo.svg';
import './App.css';

import DnD from './dnd'

import Axios from 'axios'


const CreateAndInit = () => {
  var dir = prompt("생성하실 레포지터리의 경로를 정해주세요(예: where/is/repo)")
  InitRequest(dir)
}

const InitRequest = async (dir) => {
  await Axios.get(`http://127.0.0.1:8000/git/init?path=${dir}`)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function App() {
  return (
    <div className="App">
      <button onClick={CreateAndInit}>InitBareRepository</button>
      <DnD />
    </div>
  );
}

export default App;
