
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
    backgroundColor: '#eeeeee50',
    marginTop: '2em',
    height: 'auto',
    minHeight: '500px',
    width: '100%',
    position: 'relative',
  },
  input: {
    padding: '0.95em 0',
    fontFamily: 'Courier Prime',
    borderRadius: '2px',
    width: '100%',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
}));

const Main = () => {
  const classes = useStyles();
  // const urlTest = 'https://i1.wp.com/www.lapagina.com.sv/wp-content/uploads/2020/09/keanu-reeves-01.jpg';
  // const urlTest = 'https://spoiler.bolavip.com/__export/1599082992544/sites/bolavip/img/2020/09/02/keanu_reeves_crop1599082992128.jpg_1577178466.jpg';
  const [inputText, setInputText] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [hideDiv, setHideDiv] = useState('');
  const [applyShadow, setApplyShadow] = useState('');
  const [boxes, setBoxes] = useState([]);

  const oninputTextChange = (event) => {
    setInputText(event.target.value);
  }

  const showImage = useCallback(() => {
    console.log('[*] Show image.');
    setImgSrc(inputText);
    setHideDiv('hideDiv');
    setApplyShadow('applyShadow');
  }, [inputText]);

  const hideImage = useCallback(() => {
    setImgSrc('');
    setHideDiv('');
    setApplyShadow('');
  }, []);

  const formSubmitted = useCallback(async (event) => {
    event.preventDefault();

    // Validate
    if (!inputText.trim()) return;
    if (!validator.isURL(inputText)) return;

    // DOM manipulation
    showImage();

    const response = await predict(inputText); // Predict

    if (response) { // Found face(s)
      if (response.outputs[0].data.regions) {
        const img = document.getElementsByName("image")[0];
        const newBoxes = response.outputs[0].data.regions.map((box) => {
          return ({
            id: box.id,
            regions: box.region_info.bounding_box,
            imgDim: {
              imgHeight: img.height,
              imgWidth: img.width,
            }
          });
        });
        setBoxes(newBoxes);
      }
    }
    else
      hideImage();
  }, [inputText, showImage, hideImage]);


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
            color="secondary"
            type="submit"
          >Process</Button>
        </div>
        <div className={classes.imageDiv} id={hideDiv}>
          {
            boxes.map((box, index) => {
              // console.log('Box', box);
              //console.log('box index', index);
              return (
                <Box
                  key={box.id}
                  imgDim={box.imgDim}
                  regions={box.regions}
                />
              );
            })
          }
          <img name="image" className={classes.img} id={applyShadow} alt='' src={imgSrc} />
        </div>
      </div>
    </form>
  );
}

export default Main;