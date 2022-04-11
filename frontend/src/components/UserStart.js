import React from 'react'
import './UserStart.css'

function UserStart(props) {
  return  (props.trigger) ? (
    <div className='userStart'>
        <div className='userStart-inner'>
            <button className='close-btn' onClick={()=>props.setTrigger({countStart:false})}><span aria-hidden="false">&times;</span></button>
            {props.children}
        </div>
    </div>
  ) : "";
}
export default UserStart