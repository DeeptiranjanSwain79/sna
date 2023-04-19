import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    CLEAR_ERRORS
} from "../constants/productContants"

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.data.product,
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const newProductReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.data.success,
                product: action.payload.data.product,
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                product: action.payload,
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};
