export const ACTION_TYPES = {
  addProduct: 'ADD_PRODUCTS',
  deleteProduct: 'DELETE_PRODUCTS',
  updateSearchString: 'UPDATE_SEARCH_STRING'
};

export function addProduct(product) {
  debugger;
  return {
    type: ACTION_TYPES.addProduct,
    payload: {
      product
    }
  };
}

export function deleteProduct(id) {
  return {
    type: ACTION_TYPES.deleteProduct,
    payload: {
      id
    }
  };
}

export function updateSearchString(searchInput) {
  return {
    type: ACTION_TYPES.updateSearchString,
    payload: {
      searchInput
    }
  };
}
