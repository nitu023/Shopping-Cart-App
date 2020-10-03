import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import { addQuantity, removeFromCart, subtractQuantity } from "../redux/action";

const useStyles = makeStyles({
  root: {
    maxWidth: 290,
    float: "left",
    marginLeft: 20,
    marginTop: 20,
    border: "1px solid gray",
    height: 500,
    width: 510,
  },
  media: {
    height: 280,
  },
  Button: {
    marginLeft: "5%",
    marginBottom: 10,
  },
});

const CartComponent = () => {
  let items = useSelector((state) => state.cartItem);
  let total = useSelector((state) => state.total);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickRemoveFromCart = (itemsId) => {
    dispatch(removeFromCart(itemsId));
    console.log(itemsId);
  };

  const handleClickAddQuantity = (itemId) => {
    dispatch(addQuantity(itemId));
  };

  const handleClickSubtractQuantity = (itemId) => {
    dispatch(subtractQuantity(itemId));
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: "center" }}
                  >
                    Quantity :{" "}
                    {item.quantity !== undefined ? item.quantity : null}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  onClick={() => handleClickAddQuantity(item.id)}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.Button}
                  onClick={() => handleClickRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  onClick={() => handleClickSubtractQuantity(item.id)}
                >
                  -
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <div> Data is not available </div>
      )}
      {items ? (
        <div style={{ float: "right", marginRight: "100px" }}>
          <Typography style={{ marginTop: "40px" }}>
            Total Amount : {total}
          </Typography>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              className={classes.Button}
            >
              Buy Now
            </Button>
          </CardActions>
        </div>
      ) : null}
    </div>
  );
};

export default CartComponent;
