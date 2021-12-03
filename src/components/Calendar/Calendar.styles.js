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
    align-content: center;
`

export const WeekdaysStyles = styled.div`
    display: flex;

    span {
        flex: 0 1 14.28%;
        background: #EBEBEB;
        border: 1px solid #7D7D7D;
        padding: 3px 0;
    }
`

export const DaysStyles = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;

    div {
        flex: 0 1 14.28%;
        text-align: left;
        padding: 5px;
        border: 1px solid #7D7D7D;
        height: 100px;
        position: relative;
        overflow: hidden;

        &.placeholder {
            background: #CCCCCC;
        }

        &:before {
            content: attr(data-day);
            position: absolute;
        }

        ul {
            width: 100%;
            list-style: none;
            padding: 0 0 0 25px;
            margin: 0;
            overflow-y: auto;
            max-height: 100%;

            li {
                width: 100%;
                padding: 0;
                font-size: 11px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;
                margin: 2px 0 0 0;
                display: flex;

                span {
                    flex: 1 1 100%;
                    overflow: hidden;
                    padding: 3px;
                    border-radius: 2px;
                }
            }
        }
    }
`