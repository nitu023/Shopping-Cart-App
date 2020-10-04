import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterItem,
  searchItem,
  addToCart,
  viewDetails,
} from "../redux/action";
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
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
  Modal,
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    maxWidth: 290,
    float: "left",
    marginLeft: 40,
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
  const [searchName, setSearchName] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const changeCategory = useSelector((state) => state.categoryName);
  const filterItems = useSelector((state) => state.filterItems);
  const searchItems = useSelector((state) => state.searchItems);
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

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };
  // console.log(searchName, searchItems);

  const handleClickSearch = () => {
    dispatch(searchItem(searchName));
    setOpenModal(true);
  };

  console.log(filterItems);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            style={{ width: "150px", marginLeft: "15px", marginTop: "20px" }}
          >
            <InputLabel style={{ fontWeight: "bold" }}>Sort By</InputLabel>
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
          </FormControl>{" "}
          <br></br>
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
          <Grid container spacing={1} style={{ margin: "35px" }}>
            <Grid item xs={4}>
              {" "}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Search.."
                style={{ marginRight: "10px", marginTop: "-10px" }}
                value={searchName}
                onChange={handleSearchChange}
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleClickSearch}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {searchItems.length > 0 && searchItems ? (
              searchItems.map((item) => {
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
              <div style={{ textAlign: "center" }}>
                {" "}
                Search Data is not Available
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <p
              style={{
                textAlign: "center",
                color: "blue",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {" "}
              Category Wise Filterd Data
            </p>
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
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            marginTop: "200px",
            width: "400px",
            marginLeft: "300px",
            background: "white",
            transform: "translate (-50%, -50%)",
            left: "50%",
            top: "30%",
          }}
        >
          {
            searchItems ?searchItems.slice(0,10).map(e=>{
              return(
                <div>
                <h5>{e.name.slice(0,50)}</h5>
                </div>
              )
            })
            : null
          }
        </div>
      </Modal>
    </div>
  );
}
