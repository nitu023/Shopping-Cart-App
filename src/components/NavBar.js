import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core/";
import CategoryIcon from "@material-ui/icons/Category";
import MenuIcon from "@material-ui/icons/Menu";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { changeCategory } from "../redux/action";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cartItem);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const categoriesName = [
    "tq-mia-collections",
    "tq-mia-category",
    "Mia",
    "Collections",
    "Silver",
    "Jewellery",
    "Jeweller",
  ];

  const handleChangeCategory = (category) => {
    dispatch(changeCategory(category));
    history.push("/category");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {categoriesName.map((category) => {
        return (
          <MenuItem onClick={() => handleChangeCategory(category)}>
            {category}
          </MenuItem>
        );
      })}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            MyCart
          </Typography>
          <div style={{ marginLeft: "30px"}}>
            <Typography variant="h6" noWrap>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </Typography>
          </div>
          <IconButton
            edge="end"
            style={{ marginLeft: "40px" }}
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <CategoryIcon />
            <Typography variant="h6" noWrap>
              Category
            </Typography>
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cart.length} color="secondary">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <AddShoppingCartIcon />
                </Link>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
