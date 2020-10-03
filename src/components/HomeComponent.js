import React from "react";
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
} from "@material-ui/core/";
import { addToCart, removeFromCart, viewDetails } from "../redux/action";
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
  let items = useSelector((state) => state.items);
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

  console.log(items);
  return (
    <div>
      {items ? (
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
    </div>
  );
};

export default HomeComponent;
