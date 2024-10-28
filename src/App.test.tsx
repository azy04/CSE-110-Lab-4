import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {within} from '@testing-library/dom'
import App from './App';

describe("Initialize Budget App", () => {
  test("render app properly", () => {
    render(<App />);

    expect(screen.queryByText("My Budget Planner")).toBeInTheDocument();
    expect(screen.queryByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.queryByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.queryByText("Spent so far: $0")).toBeInTheDocument();
    expect(screen.queryByText("Expenses")).toBeInTheDocument();
    expect(screen.queryByText("Add Expense")).toBeInTheDocument();
    expect(screen.queryByText("Name")).toBeInTheDocument();
    expect(screen.queryByText("Cost")).toBeInTheDocument();
    expect(screen.queryByText("Save")).toBeInTheDocument();
  });
});

describe("Required Test Cases", () => {
  test("create an expense", () => {
    render(<App />);
    
    const nameInput = document.getElementById("name") as HTMLElement;
    const costInput = document.getElementById("cost") as HTMLElement;
    const saveButton = document.getElementById("save") as HTMLElement;

    fireEvent.change(nameInput, {target: {value: "Groceries"}});
    fireEvent.change(costInput, {target: {value: "100"}})
    fireEvent.click(saveButton);
    fireEvent.change(nameInput, {target: {value: "Clothes"}});
    fireEvent.change(costInput, {target: {value: "65"}})
    fireEvent.click(saveButton);
    fireEvent.change(nameInput, {target: {value: ""}});
    fireEvent.change(costInput, {target: {value: "0"}})

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Clothes")).toBeInTheDocument();
    expect(screen.getByText("$65")).toBeInTheDocument();
  });

  test("delete an expense", () => {
    render(<App />);

    const nameInput = document.getElementById("name") as HTMLElement;
    const costInput = document.getElementById("cost") as HTMLElement;
    const saveButton = document.getElementById("save") as HTMLElement;
    const expenseList = document.getElementsByClassName("list-group")[0];

    fireEvent.change(nameInput, {target: {value: "Groceries"}});
    fireEvent.change(costInput, {target: {value: "100"}})
    fireEvent.click(saveButton);
    fireEvent.change(nameInput, {target: {value: ""}});
    fireEvent.change(costInput, {target: {value: "0"}})

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    const deleteButton = within(document.getElementsByClassName("list-group-item d-flex justify-content-between align-items-center")[0] as HTMLElement).getByText("x");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Groceries")).toBeNull();
    expect(screen.queryByText("$100")).toBeNull();
  });

  test("budget balance verification", () => {
    render(<App />);

    const nameInput = document.getElementById("name") as HTMLElement;
    const costInput = document.getElementById("cost") as HTMLElement;
    const saveButton = document.getElementById("save") as HTMLElement;
    const budget = document.getElementById("budget") as HTMLElement;
    const remainingBudget = document.getElementById("remaining") as HTMLElement;
    const totalExpense = document.getElementById("total") as HTMLElement

    let budgetValue = parseInt(budget.getAttribute("data-budget") as string);
    let remainingValue = parseInt(remainingBudget.getAttribute("data-remaining") as string);
    let totalValue = parseInt(totalExpense.getAttribute("data-total") as string);
    expect(budgetValue).toBe(remainingValue+totalValue);
    expect(budgetValue).toBe(10000);
    expect(remainingValue).toBe(1000);
    expect(totalValue).toBe(0);

    fireEvent.change(nameInput, {target: {value: "Groceries"}});
    fireEvent.change(costInput, {target: {value: "100"}});
    fireEvent.click(saveButton);
    
    budgetValue = parseInt(budget.getAttribute("data-budget") as string);
    remainingValue = parseInt(remainingBudget.getAttribute("data-remaining") as string);
    totalValue = parseInt(totalExpense.getAttribute("data-total") as string);
    expect(budgetValue).toBe(remainingValue+totalValue);
    expect(budgetValue).toBe(1000);
    expect(remainingValue).toBe(900);
    expect(totalValue).toBe(100);

    fireEvent.change(nameInput, {target: {value: "Clothes"}});
    fireEvent.change(costInput, {target: {value: "65"}});
    fireEvent.click(saveButton);
    
    budgetValue = parseInt(budget.getAttribute("data-budget") as string);
    remainingValue = parseInt(remainingBudget.getAttribute("data-remaining") as string);
    totalValue = parseInt(totalExpense.getAttribute("data-total") as string);
    expect(budgetValue).toBe(remainingValue+totalValue);
    expect(budgetValue).toBe(1000);
    expect(remainingValue).toBe(835);
    expect(totalValue).toBe(165);

    fireEvent.change(nameInput, {target: {value: "Dinner"}});
    fireEvent.change(costInput, {target: {value: "24"}});
    fireEvent.click(saveButton);
    
    budgetValue = parseInt(budget.getAttribute("data-budget") as string);
    remainingValue = parseInt(remainingBudget.getAttribute("data-remaining") as string);
    totalValue = parseInt(totalExpense.getAttribute("data-total") as string);
    expect(budgetValue).toBe(remainingValue+totalValue);
    expect(budgetValue).toBe(1000);
    expect(remainingValue).toBe(811);
    expect(totalValue).toBe(189);
  });
});

describe("Test Edge Cases", () => {
  test("go over budget", () => {
    render(<App />);

    const nameInput = document.getElementById("name") as HTMLElement;
    const costInput = document.getElementById("cost") as HTMLElement;
    const saveButton = document.getElementById("save") as HTMLElement;

    window.alert = jest.fn();
    fireEvent.change(nameInput, {target: {value: "Rent"}});
    fireEvent.change(costInput, {target: {value: "1500"}});
    fireEvent.click(saveButton);

    expect(window.alert).toBeCalledWith("You have exceeded your budget!");
  });

  test("test negative expense values (receive payments)", () => {
    render(<App />);

    const nameInput = document.getElementById("name") as HTMLElement;
    const costInput = document.getElementById("cost") as HTMLElement;
    const saveButton = document.getElementById("save") as HTMLElement;
    const budget = document.getElementById("budget") as HTMLElement;
    const remainingBudget = document.getElementById("remaining") as HTMLElement;
    const totalExpense = document.getElementById("total") as HTMLElement

    let budgetValue = parseInt(budget.getAttribute("data-budget") as string);
    let remainingValue = parseInt(remainingBudget.getAttribute("data-remaining") as string);
    let totalValue = parseInt(totalExpense.getAttribute("data-total") as string);
    expect(budgetValue).toBe(remainingValue+totalValue);
    expect(budgetValue).toBe(1000);
    expect(remainingValue).toBe(1000);
    expect(totalValue).toBe(0);

    fireEvent.change(nameInput, {target: {value: "Payment"}});
    fireEvent.change(costInput, {target: {value: "-100"}});
    fireEvent.click(saveButton);
    fireEvent.change(nameInput, {target: {value: ""}});
    fireEvent.change(costInput, {target: {value: "0"}})

    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("$-100")).toBeInTheDocument();

    budgetValue = parseInt(budget.getAttribute("data-budget") as string);
    remainingValue = parseInt(remainingBudget.getAttribute("data-remaining") as string);
    totalValue = parseInt(totalExpense.getAttribute("data-total") as string);
    expect(budgetValue).toBe(remainingValue+totalValue);
    expect(budgetValue).toBe(1000);
    expect(remainingValue).toBe(1100);
    expect(totalValue).toBe(-100);
  });
});