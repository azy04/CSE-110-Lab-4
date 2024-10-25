import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const {budget, setBudget} = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  if (totalExpenses > budget) {
    alert("You have exceeded your budget!");
  }

  return (
    <div className={`alert ${alertType}`}>
      <span data-testid="remaining" data-remaining={budget - totalExpenses}>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
