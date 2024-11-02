import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    if (expenses.length == 0) {
      setExpenses([...expenses, {id: 1+"", description: description, cost: cost}]);
      createExpense({id: 1+"", description: description, cost: cost});
    }
    else {
      setExpenses([...expenses, {id: (parseInt(expenses[expenses.length-1].id)+1)+"", description: description, cost: cost}]);
      createExpense({id: (parseInt(expenses[expenses.length-1].id)+1)+"", description: description, cost: cost});
    }
    
  };

  const updateCost = (props: any) => {
    if (Number.isNaN(props)) {
      setCost(0);
    }
    else {
      setCost(props);
    }
  }

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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            onChange={(event) => updateCost(parseInt(event.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3" id="save">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
