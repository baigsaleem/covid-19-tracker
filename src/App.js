import React, { Suspense } from 'react';
import './App.css';
import MainApp from './components/MainApp';
import image from "./image.png";

function App() {
  return (
    <div className='App'>
      <img src={image} alt="covid-19" height="20%" width="20%" />
      <Suspense fallback={<h4>Loading data from API...</h4>}>
        <MainApp />
      </Suspense>
    </div>
  );
}

export default App;
