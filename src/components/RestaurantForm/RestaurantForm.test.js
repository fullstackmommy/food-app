import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import {render, fireEvent} from "react-testing-library";
import RestaurantForm from "./RestaurantForm";

const match = {
  params: {
    id: 1
  }
}
const returnPath = "/admin"
const message = /is not allowed to be empty/i;

test("displays all form fields on load", () => {

  const {getByLabelText} = render(<RestaurantForm match ={match} returnPath={returnPath}/>);

  expect(getByLabelText("Name")).toHaveAttribute("type", "text");
  expect(getByLabelText("Address")).toHaveAttribute("type", "text");
  expect(getByLabelText("Opening Time")).toHaveAttribute("type", "text");
  expect(getByLabelText("Closing Time")).toHaveAttribute("type", "text");
  expect(getByLabelText("Cuisine")).toBeInTheDocument()
  expect(getByLabelText("Average Price")).toHaveAttribute("type", "number");
  expect(getByLabelText("Image URL")).toHaveAttribute("type", "text");
});

test("Save button us disabled on page load", () => {

  const {getByText} = render(<RestaurantForm match ={match} returnPath={returnPath}/>);

  expect(getByText("Save")).toHaveAttribute("disabled");
});

test("there is no error message when it first loads", () => {
  const {queryByText} = render(<RestaurantForm match ={match} returnPath={returnPath}/>);

  expect(queryByText(message))
    .not
    .toBeInTheDocument();
})

test("error message appears if text input is invalid and is removed if valid", () => {

  const {getByText, queryByText, getByLabelText} = render(<RestaurantForm match ={match} returnPath={returnPath}/>);
  const input = getByLabelText(/name/i);

  //enter invalid input into text field
  fireEvent.change(input, {
    target: {
      value: "a"
    }
  });
  fireEvent.change(input, {
    target: {
      value: ""
    }
  });

  expect(getByText(message)).toBeInTheDocument();

  // enter valid input into text field
  fireEvent.change(input, {
    target: {
      value: "Restaurant 1"
    }
  });
  expect(queryByText(message))
    .not
    .toBeInTheDocument();
});

test("error message appears if number input is invalid and is removed if valid", () => {
  const numMessage = /must be larger than or equal to 1/i;
  const {getByText, queryByText, getByLabelText} = render(<RestaurantForm match ={match} returnPath={returnPath}/>);
  const input = getByLabelText(/Average Price/i);

  //enter invalid input into number field
  fireEvent.change(input, {
    target: {
      value: "0"
    }
  });
  expect(getByText(numMessage)).toBeInTheDocument();

  //enter valid input into number field
  fireEvent.change(input, {
    target: {
      value: "1"
    }
  });
  expect(queryByText(numMessage))
    .not
    .toBeInTheDocument();
});