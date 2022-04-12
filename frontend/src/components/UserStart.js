import React from 'react'
import './UserStart.css'

function UserStart(props) {
  return  (props.trigger) ? (
    <div className='userStart'>
        <div className='userStart-inner'>
            
            {props.children}
        </div>
    </div>
  ) : "";
}
export default UserStart