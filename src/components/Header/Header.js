import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.grey.A400,
    backgroundColor: '#818181',
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      marginLeft: '0.5em'
    }
  },
}));

const Header = () => {
  const userName = 'User';
  const classes = useStyles();
  return (
    <nav>
      <AppBar className={classes.root} position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logged in as {userName}
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default Header;