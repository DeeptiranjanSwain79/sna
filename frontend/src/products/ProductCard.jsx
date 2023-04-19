import React from 'react';
import ReactStars from "react-rating-stars-component";
import ProgressBar from "@ramonak/react-progress-bar";

const ProductCard = ({ product }) => {
    // console.log(product);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#f5c842",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    }
    return (
        <div className='productCard'>
            <img src={product.images[0].url} alt={product.name} />
            <span>{`₹${product.price}`}</span>
            <p className='pName'>{product.name}</p>
            <div>
                <ReactStars {...options} />
            </div>
            <div>
                <ProgressBar
                    completed={(product.sold / product.stock) * 100}
                    maxCompleted={100}
                    className='wrapper'
                    barContainerClassName='container'
                    completedClassName='barCompleted'
                    labelClassName='label'
                    height="10px"
                    width="100%"
                />
            </div>
            <p className='sold'>Sold: {product.sold}</p>
        </div>
    )
}

export default ProductCard
