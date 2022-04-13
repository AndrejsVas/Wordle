// import React, { Component } from 'react'

// import './InputBox.css'

// const Input = styled.input`
//     justify-content: space-between;
//     width: 45px;
//     height: 45px;
//     margin: 2px;
//     border-radius: 4px;
//     text-align: center;
//     font-size: 34px;
//     font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
//         Arial sans-serif;
//     caret-color: transparent;
//     background-color: ${props => (props.charStatus == 3) ? "lime" : (props.charStatus == 2) ? "yellow" : (props.charStatus == 1) ? "gray" : "withe"};
//     border-color: ${props => props.badWord ? "red" : "withe"};
//     border-width: 3px;
// `;



function InputBox({
    handleKeyDown,
    handleChange,
    // handleFocus,
    name,
    inputRef,
    // isActive,
    // charStatus,
    // isReadOnly,
    // isWordDenied 
}) {
    // var className = 'input-box';

    // if (isActive) className += ' is-active';
    // if (isWordDenied) className += ' word-denied';
    // switch (charStatus) {
    //     case 3:
    //         className += ' in-place';
    //         break;
    //     case 2:
    //         className += ' in-word';
    //         break;
    //     case 1:
    //         className += ' not-in-word';
    //         break;
    //     default:
    //         break;
    // }

    return (
        <input
            // readOnly={isReadOnly}
            // className={className}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            // onFocus={handleFocus}
            // type='text'
            // maxLength='1'
            name={name}
            ref={inputRef}
        />
    )
}

// export default InputBox