import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";
import { updateBudget } from "./budget-utils";

const EditBudget = () => {
    const { budget, setBudget } = useContext(AppContext);
    const [ newBudget, setNewBudget ] = useState(0);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
          setBudget(newBudget);
          updateBudget(newBudget);
    };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
        <div>
            <input
            type="text"
            className="form-control"
            style={{maxWidth: 200}}
            onChange={(event) => setNewBudget(parseInt(event.target.value))}
            ></input>
        </div>
        <div>
            <button type="submit" className="btn btn-primary mt-3" >
                Save
            </button>
        </div>
    </form>
  )
}

export default EditBudget;