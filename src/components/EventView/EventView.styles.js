import styled from 'styled-components';

export const EventViewStyles = styled.div`
    position: absolute;
    top: 30px;
    left: 50%;
    max-width 600px;
    width: 100%;
    background: #F0F0F0;
    padding: 15px;
    border-radius: 8px;

    ${ props => props.width && `
        margin-left: -${props.width / 2}px;
    `}

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-weight: normal;
            margin: 0;
        }
        .actions {
            font-size: 26px;
            flex: 0 0 auto;
            cursor: pointer;
            display: flex;

            button {
                &:first-child {
                    margin-right: 15px;
                    cursor: pointer;
                }
            }
        }
    }
    form {
        border-radius: 8px;
        padding: 0 20px 15px 20px;
        margin: 25px 0 0 0;
        display: inline-block;
        width: 100%;

        .fieldset {
            width: 100%;
            text-align: left;
            margin: 25px 0 0 0;
            float: left;

            &.half {
                width: 50%;
                padding-right: 7.5px;

                &.right {
                    padding-right: 0;
                    padding-left: 7.5px;
                }
            }

            label {
                width: 100%;
                text-transform: uppercase;
                display: block;
            }

            input, select {
                height: 35px;
                border-radius: 8px;
                border: 1px solid #C0C0C0;
                padding: 0 15px;
                background: #FFFFFF;
                width: 100%;
                margin: 10px 0 0 0;
            }

            p{
                line-height: 35px;
                margin: 10px 0 0 0;
            }
            
            ul {
                list-style: none;
                display: flex;
                justify-content: space-around;
                padding: 0;
                background: #FFFFFF;
                padding: 15px 0;
                margin: 10px 0 0 0;
                border-radius: 300px;

                li {
                    border-radius: 50%;
                    border: 2px solid #C0C0C0;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;

                    &.selected {
                        border-color: #505050;
                    }
                }
            }
        }
    }
`