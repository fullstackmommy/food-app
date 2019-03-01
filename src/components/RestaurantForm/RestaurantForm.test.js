import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import {render} from "react-testing-library";
import RestaurantForm from "./RestaurantForm";

test("displays all form fields on load", () => {

  const match = {
    params: {
      id: 1
    }
  }
  const returnPath = "/admin"
  const {getByLabelText} = render(<RestaurantForm match ={match} returnPath={returnPath}/>);

  expect(getByLabelText("Name")).toHaveAttribute("type", "text");
  expect(getByLabelText("Address")).toHaveAttribute("type", "text");
  expect(getByLabelText("Opening Time")).toHaveAttribute("type", "text");
  expect(getByLabelText("Closing Time")).toHaveAttribute("type", "text");
  expect(getByLabelText("Cuisine")).toBeInTheDocument()
  expect(getByLabelText("Average Price")).toHaveAttribute("type", "number");
  expect(getByLabelText("Image URL")).toHaveAttribute("type", "text");
});
