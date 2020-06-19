import styled from "styled-components";
import img from '../static/background.jpg';
const Container = styled.div`
    width: 100%;
    height: 100%;   
    background: url(${img}) no-repeat; 
    background-size: cover;
    background-position: center center;
`;
export default Container;