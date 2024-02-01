const getItem = localStorage.getItem("user");

const getTokenFromLocalStorage = getItem ? JSON.parse(getItem) : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json"
  }
};

const getCustomer = localStorage.getItem("customer");

const getTokenCustomerFromLocalStorage = getCustomer ? JSON.parse(getCustomer) : null;
export const configHeaderCustomer = {
  headers: {
    Authorization: `Bearer ${
      getTokenCustomerFromLocalStorage !== null ? getTokenCustomerFromLocalStorage.token : ""
    }`,
    Accept: "application/json"
  }
};
