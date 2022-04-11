import React from 'react'
import './Rules.css'

function Rules(props) {
  return (props.trigger) ? (
    <div className='rules'>
        <div className='rules-inner'>
            <button className='close-btn' onClick={()=> props.setTrigger({count:false})}><span aria-hidden="true">&times;</span></button>
            {props.children}
        </div>
    </div>
  ) : "";
}
export default Rules
