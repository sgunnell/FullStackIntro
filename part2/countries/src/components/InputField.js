import React from "react";
import CloseButton from 'react-bootstrap/CloseButton';

const InputField = ({label,type,value,onChange,reset}) => (
    <div>

        <label>
            {label}
        </label> 
        <input
            type={type}
            value={value}
            onChange={onChange}
        />
       


    </div>



)

export default InputField;