import React from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

import Particles from 'react-particles-js';
import particlesParams from './config/particlesParams';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    flexGrow: 1,
  },
  main: {
    flexGrow: 4,
    paddingTop: '1em',
  },
  footer: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item md={12} sm={12} className={classes.header}>
        <Header />
      </Grid>

      <Grid item container className={`${classes.main}`}>
        <Grid item md={3} sm={1} />

        <Grid item md={6} sm={10} >
          <Main />
        </Grid>

        <Grid item md={3} sm={1} />
      </Grid>

      <Grid item md={12} sm={12} className={classes.footer}>
        <Footer />
      </Grid>
      <Particles className="background" params={particlesParams} />
    </div>
  );
}

export default App;
