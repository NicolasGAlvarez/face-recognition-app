
import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Main.css';
import validator from 'validator';

import predict from '../../API'
import Box from '../Box/Box.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gridTemplateRows: 'auto 10px 3fr',
  },
  inputDiv: {
    gridColumnStart: 1,
    gridColumnEnd: 8,
  },
  buttonDiv: {
    gridColumnStart: 9,
    gridColumnEnd: 10,
    justifySelf: 'end',
  },
  imageDiv: {
    gridColumnStart: 1,
    gridColumnEnd: -1,
    gridRowStart: 3,
    gridRowEnd: -1,
    marginTop: '2em',
    height: 'auto',
    minHeight: '500px',
    width: '100%',
    position: 'relative',
  },
  greyBackground: {
    backgroundColor: '#eeeeee50',
  },
  input: {
    padding: '0.95em 0 0.95em 1em',
    fontFamily: 'Courier Prime',
    borderRadius: '2px',
    width: '100%',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  applyShadow: {
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.4), 0px 3px 4px 0px rgba(0,0,0,0.28), 0px 1px 8px 0px rgba(0,0,0,0.24)',
  }
}));

const Main = () => {
  const classes = useStyles();
  // const urlTest = 'https://i1.wp.com/www.lapagina.com.sv/wp-content/uploads/2020/09/keanu-reeves-01.jpg';
  // const urlTest = 'https://spoiler.bolavip.com/__export/1599082992544/sites/bolavip/img/2020/09/02/keanu_reeves_crop1599082992128.jpg_1577178466.jpg';
  const urlTest = 'https://s3.amazonaws.com/eiblogimages/uploads/images/6-Steps-for-a-Safe-and-Effective-Crowd-Management-Strategy.png';
  const [inputText, setInputText] = useState(urlTest);
  const [imgSrc, setImgSrc] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [applyShadow, setApplyShadow] = useState('');

  const oninputTextChange = (event) => {
    setInputText(event.target.value);
  }

  const setNewBoxes = useCallback((regions) => {
    const image = document.getElementById('image');
    const newBoxes = regions.map((box) => {
      return ({
        id: box.id,
        regions: box.region_info.bounding_box,
        imgDim: {
          imgHeight: image.height,
          imgWidth: image.width,
        }
      });
    });
    setBoxes(newBoxes);
  }, []);


  const formSubmitted = useCallback(async (event) => {
    event.preventDefault();

    if (!inputText.trim()) return; // Empty input text
    if (!validator.isURL(inputText)) return; // Not a valid url

    setBoxes([]);

    // Show image
    setImgSrc(inputText);
    setApplyShadow(classes.applyShadow);

    const response = await predict(inputText)
      .then((response) => {
        if (response) {
          if (response.outputs[0].data.regions) // Found faces
            setNewBoxes(response.outputs[0].data.regions);
        }
      });
  }, [inputText, setNewBoxes, classes.applyShadow]);


  return (
    <form onSubmit={formSubmitted}>
      <div className={classes.root}>
        <div className={classes.inputDiv}>
          <input
            placeholder="Image Url"
            type="text"
            className={classes.input}
            onChange={oninputTextChange}
            value={inputText}
          />
        </div>
        <div className={classes.buttonDiv}>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >Process</Button>
        </div>
        <div className={classes.imageDiv}>
          {
            boxes.map(box => (
              <Box
                key={box.id}
                imgDim={box.imgDim}
                regions={box.regions}
              />
            ))
          }
          <img className={`${classes.img} ${applyShadow}`} id="image" alt='' src={imgSrc} />
        </div>
      </div>
    </form>
  );
}

export default Main;