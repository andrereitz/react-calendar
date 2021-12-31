import styled from 'styled-components';

export const CalendarStyles = styled.div`
    max-width: 1100px;
    width: 100%;
    display: inline-block;
`

export const TestDatesStyles = styled.div`
    margin: 10px 0 20px 0;
`

export const HeaderStyles = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #606060;
`

export const WeekdaysStyles = styled.div`
    display: flex;
    border-radius: 10px 10px 0 0;
    border: 1px solid #CFCFCF;
    height: 45px;
    align-items: center;
    background: #F0F0F0;
    color: #606060;

    span {
        flex: 1 1 14.28%;
        text-transform: uppercase;
    }
`

export const DaysStyles = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    border: 1px solid #CFCFCF;
    border-top: 0;
    border-radius: 0 0 10px 10px;
    overflow: hidden;

    div {
        flex: 1 1 14.28%;
        text-align: left;
        padding: 5px;
        height: 100px;
        position: relative;
        overflow: hidden;
        background: linear-gradient(117.62deg, #F6F6F6 0%, #E6E6E6 100%);
        cursor: pointer;

        &:hover {
            background: linear-gradient(117.62deg, #FFFFFF 0%, #E6E6E6 100%);

            &:before {
                color: #909090;
            }
        }

        &.placeholder {
            background: linear-gradient(117.62deg, #E6E6E6 0%, #D6D6D6 100%);
        }

        &:before {
            content: attr(data-day);
            position: absolute;
            font-size: 18px;
            font-weight: bold;
            z-index: 0;
            color: #B0B0B0;
            left: 5px;
            top: 5px;
        }

        ul {
            width: 100%;
            list-style: none;
            padding: 0 0 0 25px;
            margin: 0;
            overflow-y: auto;
            max-height: 100%;
            z-index: 1;
            position: relative;

            li {
                width: 100%;
                padding: 0;
                font-size: 11px;
                white-space: nowrap;
                overflow: hidden;
                cursor: pointer;
                margin: 2px 0 0 0;
                display: flex;
                
                span {
                    flex: 1 1 100%;
                    overflow: hidden;
                    padding: 3px;
                    border-radius: 2px;
                    text-overflow: ellipsis;
                }
            }
        }
    }
`