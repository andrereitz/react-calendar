import styled from 'styled-components';

export const ButtonStyles = styled.button`
    border-radius: 8px;
    background: #606060;
    padding: 5px 20px;
    color: #FFFFFF;
    border: 0;
    margin-left: ${ props => props.marginLeft }px;
    margin-right: ${ props => props.marginRight }px;
    cursor: pointer;
`