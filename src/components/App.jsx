// import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ButtonLoad } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spiner } from './Loader/Loader';
import { pictureResp } from '../HelpComp/Respons';
import { MySwal } from '../HelpComp/Answer';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);
  const [isdownload, setIsdownload] = useState(null);
  const [isload, setIsload] = useState(null);
  const [bigImage, setBigImage] = useState(false);
  const [totalHitsLeft, setTotalHitsLeft] = useState(null);
  const [downmore, setDownload] = useState(false);
  //   state = {
  //   gallery: null,
  //   page: 0,
  //   search: null,
  //   isdownload:null,
  //   isload: null,
  //   bigImage: false

  // }

  const onHandler = props => {
    console.log(props);
    if (search === props) {
      MySwal.fire({
        title: 'try new word',
        icon: 'warning',
      });
      return;
    }
    setGallery(null);
    setPage(0);
    setIsload(null);
    setBigImage(false);
    setSearch(props);
    setIsdownload(true);
    setTotalHitsLeft(null);
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    console.log(search);
    async function myResponse() {
      if (!downmore) {
        console.log(13);
        setIsdownload(true);
        const respons = await pictureResp(search, page);
        console.log(respons.data, 57);
        const {
          data: { totalHits, hits },
        } = respons;

        if (hits.length < 1) {
          MySwal.fire({
            title: 'Nothing found on this request',
            icon: 'warning',
          });
        }

        if (search) {
          setIsload(true);
          setIsdownload(null);
          setGallery(hits);
          console.log(74);
          setTotalHitsLeft(totalHits - 12);
          setDownload(true);
          return;
        }

        console.log(83);
        setGallery(prevImage => [...prevImage, ...hits]);
        setTotalHitsLeft(totalHitsLeft - 12);
        setIsdownload(null);
        setDownload(true);
      }
    }
    myResponse();
  }, [search, page, isdownload, isload, totalHitsLeft, gallery]);

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

// export class App extends Component {

//   state = {
//   gallery: null,
//   page: 0,
//   search: null,
//   isdownload:null,
//   isload: null,
//   bigImage: false

// }

//   onHandler = (props) => {
//     const {search} = this.state;
//     console.log(props);
//     if (search === props) {
//       MySwal.fire({
//         title: "try new word",
//         icon: "warning"
//       })
//       return
//     }

//     this.setState({
//       gallery:null,
//       page: 0,
//       isload: null,
//       bigImage: false,
//       search: props,
//       isdownload: true,
//       totalHitsLeft: null
//   })
//   }

// async componentDidUpdate(prevProps, prevState) {

//   const {page, search} = this.state

//   if (prevState.search !== search || prevState.page !== page) {
//     console.log(prevState.page, page);
//     this.setState({isdownload:true});
//     const respons = await pictureResp(search, page);
//     const {data:{totalHits,hits}} = respons;
//     if (hits.length < 1) {
//       MySwal.fire({
//         title: "Nothing found on this request",
//         icon: "warning"
//       })
//     }

//     if (prevState.search !== search) {
//       this.setState({
//         isload: true,
//         isdownload: null,
//         gallery: hits,
//         totalHitsLeft: totalHits-12
//       })
//       return
//     }
//     console.log(respons.data);
//     this.setState((prev) => ({
//       gallery: [...prev.gallery, ...hits],
//       totalHitsLeft: prev.totalHitsLeft-12,
//       isdownload:null
//           })
//       )
//   }
//   }

// onLargePicture=(e)=> {
//   this.setState({bigImage : e})
//   }

// onModalClick = (e) => {
//   this.setState((prev)=>({bigImage : !prev.bigImage}))
//   }

// onClickLoad = () => {
//     this.setState((prev) =>
//       ({page: prev.page+1}))
//   }

// render(){

//   const {gallery, page, isload, isdownload, totalHitsLeft,bigImage} = this.state
//   return <div>

//     <Searchbar onSubmit={this.onHandler} />
//     {bigImage &&
//     <Modal bigImage={bigImage} onModalClick={this.onModalClick } />
//     }
//     {isload && <ImageGallery onRender={gallery} onLargePicture={this.onLargePicture} />}
//     {isdownload && <Spiner/>}
//     {page >= 0 && totalHitsLeft>0 &&<ButtonLoad onClickSearch={this.onClickLoad} />}
//      </div>
//   };
// };
