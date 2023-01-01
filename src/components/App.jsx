import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { ButtonLoad } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Spiner } from './Loader/Loader'
import { pictureResp } from "../HelpComp/Respons"
import {MySwal} from "../HelpComp/Answer"



export class App extends Component {
  
  state = {
  gallery: null,
  page: 0,
  search: null,
  isdownload:null,
  isload: null,
  bigImage: false
  
}

  onHandler = (props) => {
    const {search} = this.state;
    console.log(props);
    if (search === props) {
      MySwal.fire({
        title: "try new word",
        icon: "warning"
      })
      return 
    }
  
    this.setState({
      gallery:null,
      page: 0,
      isload: null,
      bigImage: false,
      search: props,
      isdownload: true,
      totalHitsLeft: null
  })
  }
  
async componentDidUpdate(prevProps, prevState) {

  const {page, search} = this.state

  if (prevState.search !== search || prevState.page !== page) {
    console.log(prevState.page, page);
    this.setState({isdownload:true});
    const respons = await pictureResp(search, page);
    const {data:{totalHits,hits}} = respons;
    if (hits.length < 1) {
      MySwal.fire({
        title: "Nothing found on this request",
        icon: "warning"
      })
    }

    if (prevState.search !== search) {
      this.setState({
        isload: true,
        isdownload: null,
        gallery: hits,
        totalHitsLeft: totalHits-12
      })
      return
    }
    console.log(respons.data);
    this.setState((prev) => ({
      gallery: [...prev.gallery, ...hits],
      totalHitsLeft: prev.totalHitsLeft-12,
      isdownload:null
          })
      )
  }
  }

onLargePicture=(e)=> {
  this.setState({bigImage : e})
  }

onModalClick = (e) => {
  this.setState((prev)=>({bigImage : !prev.bigImage}))
  }
  
onClickLoad = () => {
    this.setState((prev) => 
      ({page: prev.page+1}))
  }

render(){

  const {gallery, page, isload, isdownload, totalHitsLeft,bigImage} = this.state
  return <div>
      
    <Searchbar onSubmit={this.onHandler} />
    {bigImage &&
    <Modal bigImage={bigImage} onModalClick={this.onModalClick } />
    } 
    {isload && <ImageGallery onRender={gallery} onLargePicture={this.onLargePicture} />}
    {isdownload && <Spiner/>}
    {page >= 0 && totalHitsLeft>0 &&<ButtonLoad onClickSearch={this.onClickLoad} />}
     </div>
  };
};
