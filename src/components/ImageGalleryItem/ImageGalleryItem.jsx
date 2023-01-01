import PropTypes from "prop-types";


export const ImageGalleryItem =({item,onLargePicture}) => {
    const bigPicture = (e)=> {
        onLargePicture(e.currentTarget.dataset.large);
    }

    const {id, webformatURL,largeImageURL } = item;
    return <li key={id} >
                <img src={webformatURL} alt={1} data-large={largeImageURL} onClick={bigPicture} />
            </li>
}

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType
        ([PropTypes.string,
            PropTypes.number]),
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
    })
}

// export class ImageGalleryItem extends Component {
//     bigPicture =(e)=> {
//         this.props.onLargePicture(e.currentTarget.dataset.large);
//     }

//     render() {
//         const {id, webformatURL,largeImageURL } = this.props.item;
//         return <li key={id} >
//             <img src={webformatURL} alt={1} data-large={largeImageURL} onClick={this.bigPicture} />
//         </li>
//     }
// }