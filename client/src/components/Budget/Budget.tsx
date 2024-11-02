import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "./budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load budget and handle errors
    const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div id="budget" data-budget={budget}>Budget: ${budget}</div>
    </div>
  );
};

export default Budget;
