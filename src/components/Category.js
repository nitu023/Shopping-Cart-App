import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterItem } from "../redux/action";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core/";
import { addToCart, viewDetails } from "../redux/action";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  root: {
    maxWidth: 290,
    float: "left",
    marginLeft: 25,
    marginTop: 20,
    border: "1px solid gray",
    height: 550,
    width: 510,
  },
  media: {
    height: 280,
  },
  Button: {
    width: "100%",
    marginBottom: 10,
  },
});

export default function Category() {
  const categories = [
    "tq-mia-collections",
    "tq-mia-category",
    "Mia",
    "Collections",
    "Silver",
    "Jewellery",
    "Jeweller",
  ];
  const budgetList = [
    { minBudget: "0", maxBudget: "15000" },
    { minBudget: "15001", maxBudget: "25000" },
    { minBudget: "25001", maxBudget: "35000" },
    { minBudget: "35001", maxBudget: "45000" },
    { minBudget: "45001", maxBudget: "55000" },
    { minBudget: "55001", maxBudget: "65000" },
    { minBudget: "65001", maxBudget: "75000" },
    { minBudget: "75001", maxBudget: "85000" },
    { minBudget: "85001", maxBudget: "100000" },
    { minBudget: "100001", maxBudget: "1000000" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("all");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const changeCategory = useSelector((state) => state.categoryName);
  const filterItems = useSelector((state) => state.filterItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedCategories([...selectedCategories, changeCategory]);
    let array = [];
    array.push(changeCategory);
    let payload = {
      categories: selectedCategories,
      budgets: selectedBudgets,
      sortBy: sortByPrice,
    };
    dispatch(filterItem(payload));
  }, []);

  const handleClickViewdetails = (itemsId) => {
    dispatch(viewDetails(itemsId));
    history.push("/viewDetails");
    console.log(itemsId);
  };

  const handleClickAddTocart = (itemId) => {
    dispatch(addToCart(itemId));
  };

  const handleCategoryChange = (e) => {
    const category = [].concat(selectedCategories);
    if (e.target.checked) {
      category.push(e.target.value);
      setSelectedCategories(category);
    } else {
      const index = category.indexOf(e.target.value);
      if (index !== -1) {
        category.splice(index, 1);
        setSelectedCategories(category);
      }
    }
  };
  const includeBudget = (budget) => {
    return selectedBudgets.some((b) => b.maxBudget === budget.maxBudget);
  };

  const handleBudgetChange = (e, value) => {
    const newBudget = [].concat(selectedBudgets);
    if (e.target.checked) {
      newBudget.push(value);
      setSelectedBudgets(newBudget);
    } else {
      const index = newBudget
        .map((budget) => budget.maxBudget)
        .indexOf(value.maxBudget);
      if (index !== -1) {
        newBudget.splice(index, 1);
        setSelectedBudgets(newBudget);
      }
    }
  };

  const handleApplyFilter = () => {
    let payload = {
      categories: selectedCategories,
      budgets: selectedBudgets,
      sortBy: sortByPrice,
    };
    dispatch(filterItem(payload));
    console.log("hiii");
  };

  const handleChange = (event) => {
    setSortByPrice(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  console.log(filterItems);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <h4>Category</h4>
          <div>
            {categories.length &&
              categories.map((cat) => (
                <div key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    value={cat}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor={cat}>{cat}</label>
                </div>
              ))}
          </div>
          <FormControl
            style={{width: "150px", marginLeft: "15px",  marginTop: "20px" }}
          >
            <InputLabel style={{ fontWeight: 'bold'}}>Sort By</InputLabel>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sortByPrice}
              onChange={handleChange}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl> <br></br>
          <h4>Budget</h4>
          <div>
            {budgetList.length &&
              budgetList.map((value) => (
                <div key={value.maxBudget}>
                  <input
                    type="checkbox"
                    id={value.maxBudget}
                    checked={includeBudget(value)}
                    onChange={(e) => handleBudgetChange(e, value)}
                  />
                  <label htmlFor={value.maxBudget}>
                    &#8377; {value.minBudget} - &#8377; {value.maxBudget}
                  </label>
                </div>
              ))}
          </div>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              className={classes.Button}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </CardActions>
        </Grid>
        <Grid item xs={10}>
          {filterItems ? (
            filterItems.map((item) => {
              return (
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.image}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        NAME : {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        AMOUNT : &#x20B9;{item.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.Button}
                      onClick={() => handleClickViewdetails(item.id)}
                    >
                      View Details
                    </Button>
                  </CardActions>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.Button}
                      onClick={() => handleClickAddTocart(item.id)}
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <div> Data is not available </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
