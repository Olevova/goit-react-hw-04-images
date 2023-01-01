import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import PropTypes from "prop-types";




export const ImageGallery = ({ onRender,onLargePicture}) => {
  return <ImageList
    cols={4}
    rowHeight={"auto"}
    variant="masonry"
    >
    {onRender.map((item) => <ImageGalleryItem key={item.id} item={item} onLargePicture = {onLargePicture} /> )}
  </ImageList>
    }
 
ImageGallery.propTypes = {
  onRender: PropTypes.array.isRequired,
  onLargePicture: PropTypes.func.isRequired
}