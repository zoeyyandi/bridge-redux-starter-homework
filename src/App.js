import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addProduct, deleteProduct, updateSearchString } from './actions/index';
import Chance from 'chance';

export const chance = Chance();

const Product = ({ product }) => (
  <div>
    <p>Name: {product.name}</p>
    <p>Department: {product.department}</p>
    <p>Price: {product.price}</p>
    <p>Stock: {product.stock}</p>
  </div>
);

const DaBest = ({ name }) => <h1>The Best: {name}</h1>;

const DeleteButton = ({ deleteProduct, id }) => (
  <button onClick={() => deleteProduct(id)}>Delete</button>
);

const Form = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:<input name="Name" type="text" autoFocus />
      </label>

      <label>
        Department:<input name="Department" type="text" />
      </label>

      <label>
        Price:<input name="Price" type="text" />
      </label>

      <label>
        Stock:<input name="Stock" type="text" />
      </label>

      <button>Add Product</button>
    </form>
  );
};

const SearchInput = ({ handleOnChange }) => (
  <input
    onChange={handleOnChange}
    type="text"
    autoFocus
    placeholder="Search for a product"
  />
);

class App extends Component {
  handleSubmit = event => {
    event.preventDefault();
    let product = {
      id: chance.guid(),
      name: event.target[0].value,
      department: event.target[1].value,
      price: event.target[2].value,
      stock: event.target[3].value
    };
    this.props.add(product);
    event.target[0].value = '';
    event.target[1].value = '';
    event.target[2].value = '';
    event.target[3].value = '';
  };

  handleOnChange = event => {
    this.props.updateSearchString(event.target.value);
  };

  render() {
    const { searchString, productList, whoIsTheBest } = this.props;
    return (
      <div>
        <DaBest name={whoIsTheBest} />
        <SearchInput handleOnChange={this.handleOnChange} />
        {productList
          .filter(product => {
            let name = product.name.toLowerCase();
            return name.includes(searchString.toLowerCase());
          })
          .map(product => (
            <div key={product.id}>
              <Product product={product} />
              <DeleteButton
                deleteProduct={this.props.deleteProduct}
                id={product.id}
              />
            </div>
          ))}
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

// React x REDUX STUFF

const mapStateToProps = state => {
  return {
    productList: state.products.productList,
    whoIsTheBest: 'Della',
    searchString: state.products.searchString,
    // an example of how to derive state in the mapStateToProps function - this is a specific 'subset' of the full list
    lowStockProducts: state.products.productList.filter(
      prod => prod.stock && prod.stock < 4
    )
  };
};

const mapDispatchToProps = {
  add: addProduct,
  deleteProduct: deleteProduct,
  updateSearchString: updateSearchString
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
