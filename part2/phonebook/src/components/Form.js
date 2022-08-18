import React from "react";
import InputField from "./InputField"


const Form = ({onSubmit,newName,handleNameChange,newNumber,handleNumberChange}) => (
    <div>
    <form onSubmit={onSubmit}>
        <InputField 
          label="Name:"
          type="text"
          value= {newName}
          onChange= {handleNameChange}
          />

        <InputField 
          label="Number:"
          type="text"
          value= {newNumber}
          onChange= {handleNumberChange}
          />

        
        <div> <button className="button submit" type="submit">Add</button> </div>
      </form>
      </div>



)


export default Form;