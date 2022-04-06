import React from 'react'


import styled from 'styled-components'

const Input = styled.input`
    justify-content: space-between;
    width: 45px;
    height: 45px;
    margin: 2px;
    border-radius: 4px;
    text-align: center;
    font-size: 34px;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
        Arial sans-serif;
    caret-color: transparent;
    background-color: ${props => (props.charStatus == 3) ? "lime" : (props.charStatus == 2) ? "yellow" : (props.charStatus == 1) ? "gray" : "withe"};
    border-color: ${props => props.badWord ? "red" : "withe"};
    border-width: 3px;
`;

const InputBox = ({ type, handleKeyDown, handleChange, handleFocus, name, inputRef, inputProps }) => {
    return (
        <Input
            {...inputProps}
            type={type}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onocus={handleFocus}
            maxLength='1'
            name={name}
            ref={inputRef}
        />
    )

}

export default InputBox