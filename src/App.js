import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import HomeComponent from './components/HomeComponent';
import CartComponent from './components/CartComponent';
import ViewDetails from './components/ViewDetails'
import NavBar from './components/NavBar';
import Category from './components/Category';

function App() {
  return (
    <div>
       <BrowserRouter>
       <NavBar />
          <Route exact path="/" component={HomeComponent} />
          <Route path="/cart" component={CartComponent} />
          <Route path="/viewdetails" component={ViewDetails} />
          <Route path="/category" component={Category} />
       </BrowserRouter>
    </div>
  );
}

export default App;
