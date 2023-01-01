import { ThreeDots } from 'react-loader-spinner'

export const Spiner = () => {
    return <ThreeDots 
height="80" 
width="80" 
radius="9"
color="blue" 
ariaLabel="three-dots-loading"
wrapperStyle={{display:"flex", justifyContent: "center"}}
wrapperClassName=""
visible={true}
 />
} 