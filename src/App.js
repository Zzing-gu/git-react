import React, { useState, useEffect } from 'react';
import './App.css';

import DnD from './dnd'

import Axios from 'axios'





function App() {

  const [trees, setTrees] = useState(0);



  const CreateAndInit = () => {
    //var dir = prompt("생성하실 레포지터리의 경로를 정해주세요(예: where/is/repo)")
    //InitRequest(dir)
    GetRepoRequest()
    //RenderTreeRequest()
  }

  const InitRequest = async (dir) => {
    await Axios.post(`http://127.0.0.1:8000/git/init/`, { path: dir })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const RenderTreeRequest = async (hash) => {
    await Axios.post('http://127.0.0.1:8000/git/tree/', {hash:hash})
      .then((response) => {
        console.log(response);
        var obj = JSON.parse(response.data.trees)
        console.log(obj)
        setTrees(obj)
        console.log(trees)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const GetRepoRequest = async () => {
    await Axios.get(`http://127.0.0.1:8000/git/repo/`)
      .then((response) => {
        console.log(response);
        var obj = JSON.parse(response.data.trees)
        console.log(obj)
        setTrees(obj)
        console.log(trees)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    GetRepoRequest()
    //console.log(trees)
  }, [])

  const handleClick = (e) => {
    console.log(e.target.dataset.hihi)
    console.log(e)
    RenderTreeRequest(e.target.dataset.hihi)
  }



  return (
    <div className="App">
      <DnD />
      <button onClick={CreateAndInit}>InitBareRepository</button>
      <ul>

        {trees && trees.trees.map((item, index) => {

          switch (item.Mode) {
            case 100755:
              return (
                <li key={index}><b>실행</b> {item.Name}</li>
              )
              break;
            case 16384:
              return (
                <li data-hihi={item.Hash} onClick={handleClick} key={index}><b>폴더</b> {item.Name}</li>
              )
              break;
            default:
                return (
                  <li key={index}><b>파일</b> {item.Name}</li>
                )
          }

        })}
      </ul>
    </div>
  );
}

export default App;
