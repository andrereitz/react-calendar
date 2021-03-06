import styled from 'styled-components';

export const ButtonStyles = styled.button`
    border-radius: 10px;
    background: #F0F0F0;
    padding: 0 20px;
    color: #606060;
    height: ${props => props.size}px;
    line-height: ${props => props.size}px;
    border: 1px solid #CFCFCF;
    margin-left: ${ props => props.marginLeft }px;
    margin-right: ${ props => props.marginRight }px;
    cursor: pointer;
    font-size: ${props => props.fontSize};
    text-transform: uppercase;

    &:hover {
        background: #E0E0E0;
    }

    ${props => props.$round && `
        border-radius: 50%;
        width: ${props.size}px;
        padding: 0;
        overflow: hidden;
    `}
`