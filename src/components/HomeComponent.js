import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  TextField,
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import {
  addToCart,
  removeFromCart,
  viewDetails,
  searchItem,
} from "../redux/action";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 290,
    float: "right",
    //   margin: 10,
    marginRight: 20,
    // marginBottom: 10,
    marginTop: 20,
    border: "1px solid gray",
    height: 500,
    width: 510,
  },
  media: {
    height: 280,
  },
  Button: {
    //   marginLeft: "5%",
    width: "100%",
    marginBottom: 10,
  },
});

const HomeComponent = () => {
  const [searchName, setSearchName] = useState("");
  let items = useSelector((state) => state.items);
  const searchItems = useSelector((state) => state.searchItems);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickViewdetails = (itemsId) => {
    dispatch(viewDetails(itemsId));
    history.push("/viewDetails");
    console.log(itemsId);
  };

  const handleClickAddTocart = (itemId) => {
    dispatch(addToCart(itemId));
  };

  const handleClickRemoveFromcart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };
  console.log(searchName, searchItems);

  const handleClickSearch = () => {
    dispatch(searchItem(searchName));
  };

  console.log(items);
  return (
    <div>
      <Grid container spacing={1}>
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
        <Grid xs={12}>
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
                    {!item.isAdded || item.isAdded === undefined ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.Button}
                        onClick={() => handleClickAddTocart(item.id)}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.Button}
                        onClick={() => handleClickRemoveFromcart(item.id)}
                      >
                        Remove From Cart
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <div style={{ textAlign: "center"}}> Search Data is not Available  </div>
          )}
        </Grid>
        <Grid xs={12}>
        <p style={{textAlign:"center", color:"blue", fontWeight: "bold", textDecoration:"underline"}}> All Available Data</p>
          {items.length > 0 && items ? (
            items.map((item) => {
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
                    {!item.isAdded || item.isAdded === undefined ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.Button}
                        onClick={() => handleClickAddTocart(item.id)}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.Button}
                        onClick={() => handleClickRemoveFromcart(item.id)}
                      >
                        Remove From Cart
                      </Button>
                    )}
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
};

export default HomeComponent;
