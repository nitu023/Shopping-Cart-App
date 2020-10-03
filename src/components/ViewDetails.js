import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        marginTop:70,
        width: 800,
        marginLeft: "20%",
        textAlign: "center"
      
    },
    media: {
      height: 350,
      width: 300,
      float: "left"
    },
  });

export default function ViewDetails() {
  const viewItem = useSelector((state) => state.viewDetailsItem);
  const classes = useStyles();

console.log(viewItem.image)
  return (
    <div>
        {
            viewItem ? <Card  className={classes.root}>
            <CardActionArea>
            <CardMedia
            className={classes.media}
            image={viewItem.image}
            title={viewItem.name}
            />
              <CardContent style={{marginTop:"50px"}}>
                <Typography 
                  gutterBottom
                  variant="h5"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Name : {viewItem.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  Description : {viewItem.description ? viewItem.description : null}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  diamond color : {viewItem.diamond_color ? viewItem.diamond_color : null}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  Brand : {viewItem.brand ? viewItem.brand : null}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  Gender : {viewItem.gender ? viewItem.gender : null}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  Amount : {viewItem.price} &#x20B9;
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> : <div> Data is not Available </div>
        }
      
    </div>
  );
}
