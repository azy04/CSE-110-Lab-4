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
    const budget = parseInt(screen.getByTestId("budget").getAttribute("budget") as string);
    const remainingBudget = parseInt(screen.getByTestId("remaining").getAttribute("remaining") as string);
    const totalExpense = parseInt(screen.getByTestId("total").getAttribute("total") as string);

    expect(budget).toBe(remainingBudget-totalExpense);

    fireEvent.change(nameInput, {target: {value: "Groceries"}});
    fireEvent.change(costInput, {target: {value: "100"}});
    fireEvent.click(saveButton);

    expect(budget).toBe(remainingBudget-totalExpense);

    fireEvent.change(nameInput, {target: {value: "Clothes"}});
    fireEvent.change(costInput, {target: {value: "65"}});
    fireEvent.click(saveButton);
    
    expect(budget).toBe(remainingBudget-totalExpense);

    fireEvent.change(nameInput, {target: {value: "Dinner"}});
    fireEvent.change(costInput, {target: {value: "24"}});
    fireEvent.click(saveButton);
    
    expect(budget).toBe(remainingBudget-totalExpense);
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
    const budget = parseInt(screen.getByTestId("budget").getAttribute("budget") as string);
    const remainingBudget = parseInt(screen.getByTestId("remaining").getAttribute("remaining") as string);
    const totalExpense = parseInt(screen.getByTestId("total").getAttribute("total") as string);

    expect(budget).toBe(remainingBudget-totalExpense);

    fireEvent.change(nameInput, {target: {value: "Payment"}});
    fireEvent.change(costInput, {target: {value: "-100"}});
    fireEvent.click(saveButton);
    fireEvent.change(nameInput, {target: {value: ""}});
    fireEvent.change(costInput, {target: {value: "0"}})

    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("$-100")).toBeInTheDocument();
    expect(budget).toBe(remainingBudget-totalExpense);
  });
});