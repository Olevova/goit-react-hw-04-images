// import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ButtonLoad } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spiner } from './Loader/Loader';
import { pictureResp } from '../HelpComp/Respons';
import { MySwal } from '../HelpComp/Answer';
import { useState, useEffect } from 'react';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);
  const [isdownload, setIsdownload] = useState(null);
  const [isload, setIsload] = useState(null);
  const [bigImage, setBigImage] = useState(false);
  const [totalHitsLeft, setTotalHitsLeft] = useState(null);
  const [downmore, setDownload] = useState(false);

  const onHandler = props => {
    console.log(props);
    if (search === props) {
      MySwal.fire({
        title: 'try new word',
        icon: 'warning',
      });
      return;
    }

    setGallery([]);
    setPage(0);
    setIsload(null);
    setBigImage(false);
    setSearch(props);
    setIsdownload(true);
    setTotalHitsLeft(null);
    setDownload(false);
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    async function myResponse() {
      if (!downmore) {
        setIsdownload(true);
        const respons = await pictureResp(search, page);
        const {
          data: { totalHits, hits },
        } = respons;

        if (hits.length < 1) {
          MySwal.fire({
            title: 'Nothing found on this request',
            icon: 'warning',
          });
        }

        if (page < 1) {
          setIsload(true);
          setIsdownload(null);
          setGallery(hits);
          setTotalHitsLeft(totalHits - 12);
          setDownload(true);
          return;
        }

        setGallery(prevImage => [...prevImage, ...hits]);
        setTotalHitsLeft(totalHitsLeft - 12);
        setIsdownload(null);
        setDownload(true);
      }
    }
    myResponse();
  }, [search, page, isdownload, isload, totalHitsLeft, gallery, downmore]);

  const onLargePicture = e => {
    setBigImage(e);
  };

  const onModalClick = e => {
    setBigImage(!bigImage);
  };

  const onClickLoad = () => {
    setPage(page + 1);
    setDownload(false);
  };

  return (
    <div>
      <Searchbar onSubmit={onHandler} />
      {bigImage && <Modal bigImage={bigImage} onModalClick={onModalClick} />}
      {isload && (
        <ImageGallery onRender={gallery} onLargePicture={onLargePicture} />
      )}
      {isdownload && <Spiner />}
      {page >= 0 && totalHitsLeft > 0 && (
        <ButtonLoad onClickSearch={onClickLoad} />
      )}
    </div>
  );
};
