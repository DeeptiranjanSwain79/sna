import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./products.css"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { createProduct, clearErrors } from '../actions/productAction';
import { NEW_PRODUCT_RESET } from '../constants/productContants';
import AllProducts from './AllProducts';

const Products = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ratings, setRatings] = useState("");
  const [sold, setSold] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePrevierw] = useState([]);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { loading, error, success } = useSelector(state => state.newProduct);

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (success) {
      setOpen(false);
      window.alert("Product created Successfully");
      window.location.reload(false);
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, error, success]);

  const createProductSubmitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("sold", sold);
    myForm.set("ratings", ratings)
    myForm.set("stock", stock);

    image.forEach(image => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  }

  const createProductImagesChange = e => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePrevierw([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePrevierw(old => [...old, reader.result]);
          setImage(old => [...old, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    })
  }
  const opener = () => {
    open ? setOpen(false) : setOpen(true);
  }
  return (
    <div>
      <button onClick={opener} className='addProduct'>ADD A PRODUCT</button>

      <AllProducts />
      
      <Dialog
        aria-labelledby='simple-dialog-title'
        open={open}
        onClose={opener}
      >
        <DialogTitle>ADD A PRODUCT</DialogTitle>
        <DialogContent className='submitDialog'>
          <form
            encType='multipart/form-data'
            className="createProductForm"
            onSubmit={createProductSubmitHandler}
          >
            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange=
                {e => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div>
              <textarea
                type="text"
                placeholder="Product Description"
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                cols="30"
                rows='1'
              ></textarea>
            </div>

            <div>
              <input
                type="number"
                placeholder="Sold"
                required
                value={sold}
                onChange=
                {e => setSold(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Ratings"
                required
                value={ratings}
                onChange=
                {e => setRatings(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder='Stock'
                required
                onChange={e => setStock(e.target.value)}
              />
            </div>

            <p className='warning'>Choose image less than 50kb</p>

            <div id="createFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id='createProductBtn'
              type="save"
              disble={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </DialogContent>

      </Dialog>
    </div >
  )
}

export default Products