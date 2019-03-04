import React, {Component} from "react";
import {getCuisines} from "../../services/cuisineService";
import {getRestaurants, saveRestaurant} from "../../services/restaurantService";
import Input from "../common/Input/Input";
import TimeInput from "../common/Input/TimeInput";
import SelectInput from "../common/Input/SelectInput";
import Joi from "joi-browser"

class RestaurantForm extends Component {
  state = {
    cuisines: getCuisines(),
    data: {
      name: "",
      address: "",
      openingTime: "00:00",
      closingTime: "00:00",
      cuisineId: "",
      averagePrice: "",
      imageUrl: ""
    },
    error: {
      name: "",
      address: "",
      cuisineId: "",
      averagePrice: "",
      imageUrl: ""
    }
  };

  schema = {
    _id: Joi.string(),
    name: Joi
      .string()
      .required(),
    address: Joi
      .string()
      .required(),
    openingTime: Joi
      .string()
      .required(),
    closingTime: Joi
      .string()
      .required(),
    cuisineId: Joi
      .string()
      .required(),
    averagePrice: Joi
      .number()
      .integer()
      .min(1)
      .required(),
    imageUrl: Joi
      .string()
      .uri({allowRelative: true})
      .required()
  }

  validateField = (inputName, value) => {
    const schema = {
      [inputName]: this.schema[inputName]
    }
    const result = Joi.validate({
      [inputName]: value
    }, schema)
    return result.error;
  }

  validate = () => {
    const option = {
      abortEarly: false
    }
    const result = Joi.validate(this.state.data, this.schema, option);
    return result.error
  }

  componentDidMount() {
    const id = this.props.match
      ? this.props.match.params.id
      : null;
    const restaurantFound = getRestaurants().find(restaurant => restaurant._id === id);
    if (!restaurantFound) 
      return;
    const newRestaurant = {
      ...restaurantFound
    }
    newRestaurant.cuisineId = newRestaurant.cuisine._id
    delete newRestaurant.cuisine

    this.setState({data: newRestaurant});
  }

  handleSubmit = e => {
    e.preventDefault();
    const {cuisineId, averagePrice} = this.state.data;

    const isInvalidForm = this.validate()

    if (isInvalidForm) 
      return;
    
    const cuisine = getCuisines().find(cuisine => cuisine._id === cuisineId);

    let restaurant = {
      ...this.state.data
    };
    delete restaurant.cuisineId;
    restaurant.cuisine = cuisine;
    restaurant.averagePrice = parseFloat(averagePrice);

    saveRestaurant(restaurant);
    this
      .props
      .history
      .replace(this.props.returnPath);
  };

  handleChange = ({currentTarget: input}) => {
    const copy = {
      ...this.state.error
    }

    const isInvalid = this.validateField(input.name, input.value)
    if (isInvalid) {
      copy[input.name] = isInvalid.details[0].message
      this.setState({error: copy})
    } else {
      copy[input.name] = ""
      this.setState({error: copy})
    }

    const data = {
      ...this.state.data
    };
    data[input.name] = input.value;
    this.setState({data});

  };

  render() {
    const {cuisines, error} = this.state;
    const {
      name,
      address,
      openingTime,
      closingTime,
      cuisineId,
      averagePrice,
      imageUrl
    } = this.state.data;
    return (
      <div data-testid="create-page">
        <h3>{this.props.match.params.id
            ? "Edit Restaurant"
            : "New Restaurant"}</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            label="Name"
            onChange={this.handleChange}
            value={name}
            error={error.name}/>
          <Input
            name="address"
            label="Address"
            onChange={this.handleChange}
            value={address}
            error={error.address}/>
          <TimeInput
            name="openingTime"
            label="Opening Time"
            onChange={this.handleChange}
            value={openingTime}/>
          <TimeInput
            name="closingTime"
            label="Closing Time"
            onChange={this.handleChange}
            value={closingTime}/>
          <SelectInput
            name="cuisineId"
            label="Cuisine"
            options={cuisines}
            onChange={this.handleChange}
            value={cuisineId}
            error={error.cuisineId}/>
          <Input
            name="averagePrice"
            label="Average Price"
            type="number"
            onChange={this.handleChange}
            value={averagePrice}
            error={error.averagePrice}/>
          <Input
            name="imageUrl"
            label="Image URL"
            onChange={this.handleChange}
            value={imageUrl}
            error={error.imageUrl}/>
          <button className="btn btn-primary btn-sm" disabled={this.validate()}>Save</button>
        </form>
      </div>
    );
  }
}

export default RestaurantForm;
