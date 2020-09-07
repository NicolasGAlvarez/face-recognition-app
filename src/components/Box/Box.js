import React from 'react';

const Box = ({ regions, imgDim }) => {
  const { bottom_row, left_col, right_col, top_row } = regions;
  const { imgHeight, imgWidth } = imgDim;
  const top = imgHeight * top_row;
  const left = imgWidth * left_col;
  const height = imgHeight * bottom_row - top;
  const width = imgWidth * right_col - left;
  return (
    <div style={{
      float: "left",
      position: "absolute",
      border: "2px solid blue",
      height: height,
      width: width,
      top: top,
      left: left,
    }} />
  )
};

export default Box;