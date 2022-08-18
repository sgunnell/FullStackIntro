import React from "react";

const InputField = ({label,type,value,onChange}) => (
    <div>

        <label className="label">
            {label}
        </label> 
        <input
            type={type}
            className="input"
            value={value}
            onChange={onChange}
        />



    </div>



)

export default InputField;