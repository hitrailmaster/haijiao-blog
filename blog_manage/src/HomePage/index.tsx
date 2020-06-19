import React from 'react';
import { Layout } from 'antd';
import './index.css';
import MainContainer from './MainContainer';
import HeaderContainer from './HeaderContainer';
import { Redirect } from 'react-router-dom';
import { RouterProps } from '../utils/types';
import store from '../store';

const Home: React.FC<RouterProps> = (props: RouterProps) => {
    console.log('in')
    let userName = store.getState().userName;
    console.log(props.history.location)
    if(userName)
        return (<Layout className="layout">
                    <HeaderContainer user={userName}/>
                    <MainContainer></MainContainer>
                </Layout>)
    else {
        console.log('innn')
        return (
            <Redirect from="/" to="/login"></Redirect>
        )
        // props.history.push('/login')
        // return null;
    }
}
export default Home;