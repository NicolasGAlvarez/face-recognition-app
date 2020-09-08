import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    margin: 0,
    width: '100%',
    padding: '0.6em',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
  },
}));


const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>Powered by null <span role="img" aria-label="taco">🌮</span></Typography>
    </div>
  );
}

export default Footer;

/*
className={classes.root}
*/