import { Component } from "react";
import { ImRocket } from 'react-icons/im';
import style from "./Searchbar.module.scss"
import PropTypes from "prop-types";



export class Searchbar extends Component{
    state = {
        picture:''
  }

    onChangePicture = (e) => {
        this.setState({picture:e.currentTarget.value.toLowerCase()})
        
    }
    
    formHandler = (e) => {
        e.preventDefault();
        console.log(e.target.picture.value);
        this.props.onSubmit(this.state.picture)

        
 }
    
    render() {
        return (
            <header className={style.Searchbar } >
                <form className={style.SearchForm }  onSubmit={this.formHandler}>
                    <button type="submit" className={style.SearchForm_button}>
                        <ImRocket style={{ display: "flex", justifyContent: "center", fill: "red"}} />
                        <span className={style.SearchForm_button_label}>Search</span>
                    </button>

                    <input
                        className={style.SearchForm_input}
                        type="text"
                        name="picture"
                        value={this.state.picture}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.onChangePicture}
                    />
                </form>
            </header>)
    }
}

Searchbar.propTypes ={
    picture: PropTypes.string,
    
}