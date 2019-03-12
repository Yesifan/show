import React, { useRef, useEffect } from 'react';
import { HashRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import nest from './Utils/nest';
import Main from './Route';
import TodoList from './Route/todo';
import Swiper from "./Route/Swiper";
import Carousel from "./Route/Carousel";
import Chat from "./Route/chat";
import Nope from "./Route/404/index";

function App() {
  const canvas = useRef();
  useEffect(()=>nest(canvas.current),[])
  return (
    <Router>
      <div>
        <canvas style={{position:'fixed',top:0,left:0,width:'100%',height:'100%'}} ref={canvas}/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/todo/:filter" component={TodoList} />
          <Route exact path="/carousel" component={Carousel} />
          <Route exact path="/swiper" component={Swiper} />
          <Route exact path="/chat" component={Chat} />
          <Redirect from="/todo" to="/todo/all" />          
          <Route component={Nope} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
