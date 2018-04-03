import React, { Component } from 'react';
import HeaderFile from './HeaderFile.js';
import Courses from './Courses.js';
//import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
        <HeaderFile />
        <Courses />
     </div>
        );
    }
}

export default App;

