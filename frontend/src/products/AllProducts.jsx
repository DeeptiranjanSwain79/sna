import React, { useEffect } from 'react';
import "./AllProducts.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../actions/productAction';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );
    useEffect(() => {
        if (error) {
            console.log(error);
            dispatch(clearErrors);
        }
        dispatch(getProduct());
    }, [dispatch, error])
    return (
        <div>
            {loading ? "Loading..." : (
                <div className="products">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default AllProducts