import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import exp from "constants";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    if (expenses.length == 0) {
      setExpenses([...expenses, {id: 1+"", name: name, cost: cost}]);
    }
    else {
      setExpenses([...expenses, {id: expenses[expenses.length-1].id+1, name: name, cost: cost}]);
    }
    
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(parseInt(event.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
