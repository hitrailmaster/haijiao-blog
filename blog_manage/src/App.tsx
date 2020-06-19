import React, { useState, useEffect } from 'react';
import Login from './LoginPage';
import Home from './HomePage';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const App: React.FC = () => {
    const [userName, setName] = useState(sessionStorage.getItem('user') || "");
    function setUserName(user: string): void {
        setName(user);
        sessionStorage.setItem('user', user);
    }
    return (
        <BrowserRouter>
                {/* <TransitionGroup>
                    <CSSTransition
                        in={true}
                    > */}
                    <Switch>
                        {/* <Route path='/login' component={Login}/> */}
                        <Route path='/*' component={Login}/>
                    </Switch>
                    {/* </CSSTransition>
                </TransitionGroup> */}
        </BrowserRouter>
    );
}

export default App;
