import {
  ADD_CART,
  VIEW_DETAILS,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  CHANGE_CATEGORY,
  FILTER_ITEM,
  SEARCH_ITEM,
} from "./action";
import { items } from "./state";

const initialState = {
  items: items,
  cartItem: [],
  viewDetailsItem: {},
  total: 0,
  removeItems: {},
  filterItems: [],
  categoryName: "",
  searchItems:[],
};

export let reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      const itemsList = [...state.items];
      itemsList.find((item) => item.id === action.payload).isAdded = true;
      let newItemsAdded = state.items.find(
        (item) => item.id === action.payload
      );
      newItemsAdded.quantity = 1;
      let newTotal = state.total + newItemsAdded.price;
      console.log(state.cartItem);
      return {
        ...state,
        items: itemsList,
        total: newTotal,
        cartItem: [...state.cartItem, newItemsAdded],
      };
    case VIEW_DETAILS:
      let temp = state.items.filter((item) => item.id === action.payload)[0];
      return {
        ...state,
        viewDetailsItem: temp,
      };
    case REMOVE_FROM_CART:
      const itemsLists = [...state.items];
      itemsLists.find((item) => item.id === action.payload).isAdded = false;
      let removeItem = state.cartItem.filter(
        (item) => item.id !== action.payload
      );
      let newTotals = state.total - removeItem.price * removeItem.quantity;
      console.log(state.removeItems);
      return {
        ...state,
        items: itemsLists,
        cartItem: removeItem,
        total: newTotals,
      };
    case ADD_QUANTITY:
      let addedItem = state.cartItem.find((item) => action.payload === item.id);
      addedItem.quantity += 1;
      let newTotalAdded = state.total + addedItem.price;
      return {
        ...state,
        cartItem: [...state.cartItem],
        total: newTotalAdded,
      };
    case SUBTRACT_QUANTITY:
      let subtractItems = state.items.find(
        (item) => item.id === action.payload
      );
      if (subtractItems.quantity === 1) {
        const itemsList_sub = [...state.items];
        itemsList_sub.find(
          (item) => item.id === action.payload
        ).isAdded = false;
        let new_items = state.cartItem.filter(
          (item) => item.id !== action.payload
        );
        let newTotalsubtract = state.total - subtractItems.price;
        return {
          ...state,
          items: itemsList_sub,
          cartItem: new_items,
          total: newTotalsubtract,
        };
      } else {
        subtractItems.quantity -= 1;
        let newTotalsubtract = state.total - subtractItems.price;
        return {
          ...state,
          cartItem: [...state.cartItem],
          total: newTotalsubtract,
        };
      }

    case CHANGE_CATEGORY:
      return {
        ...state,
        categoryName: action.payload,
      };
    case FILTER_ITEM:
      let { categories, budgets, sortBy } = action.payload;
      if (categories.length === 0) {
        if (budgets.length === 0) {
          if (sortBy === "all") {
            return {
              ...state,
              filterItems: state.items,
            };
          } else if (sortBy === "asc") {
            let temp = state.items.sort((a, b) => {
              return a.price - b.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          } else if (sortBy === "desc") {
            let temp = state.items.sort((a, b) => {
              return b.price - a.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          }
        } else {
          let newFilteredArr = [];
          for (let i = 0; i < budgets.length; i++) {
            console.log(budgets[i]);
            for (let j = 0; j < state.items.length; j++) {
              if (
                state.items[j].price >= Number(budgets[i].minBudget) &&
                state.items[j].price <= Number(budgets[i].maxBudget)
              ) {
                newFilteredArr.push(state.items[j]);
              }
            }
          }
          if (sortBy === "all") {
            return {
              ...state,
              filterItems: newFilteredArr,
            };
          } else if (sortBy === "asc") {
            let temp = newFilteredArr.sort((a, b) => {
              return a.price - b.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          } else if (sortBy === "desc") {
            let temp = newFilteredArr.sort((a, b) => {
              return b.price - a.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          }
        }
      } else {
        let filterdArr = [];
        for (let i = 0; i < categories.length; i++) {
          for (let j = 0; j < state.items.length; j++) {
            if (categories[i] === state.items[j].category) {
              filterdArr.push(state.items[j]);
            }
          }
        }
        if (budgets.length === 0) {
          if (sortBy === "all") {
            return {
              ...state,
              filterItems: filterdArr,
            };
          } else if (sortBy === "asc") {
            let temp = filterdArr.sort((a, b) => {
              return a.price - b.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          } else if (sortBy === "desc") {
            let temp = filterdArr.sort((a, b) => {
              return b.price - a.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          }
        } else {
          let newFilteredArr = [];
          for (let i = 0; i < budgets.length; i++) {
            for (let j = 0; j < filterdArr.length; j++) {
              if (
                filterdArr[j].price >= Number(budgets[i].minBudget) &&
                filterdArr[j].price <= Number(budgets[i].maxBudget)
              ) {
                newFilteredArr.push(filterdArr[j]);
              }
            }
          }
          if (sortBy === "all") {
            return {
              ...state,
              filterItems: newFilteredArr,
            };
          } else if (sortBy === "asc") {
            let temp = newFilteredArr.sort((a, b) => {
              return a.price - b.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          } else if (sortBy === "desc") {
            let temp = newFilteredArr.sort((a, b) => {
              return b.price - a.price;
            });
            return {
              ...state,
              filterItems: temp,
            };
          }
        }
        return {
            ...state
        }
      }
      break;
    case SEARCH_ITEM:
        let searchItemsArr = []
        for(let i = 0; i < state.items.length; i++){
            if(state.items[i].name.toLowerCase().includes(action.payload.toLowerCase())){
                searchItemsArr.push(state.items[i])
            }
        }
        console.log(searchItemsArr)
        return{
            ...state,
            searchItems: searchItemsArr
        }
    default:
      return {
        ...state,
      };
  }
};
