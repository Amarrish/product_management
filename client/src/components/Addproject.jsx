import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ComponentStyle.css'
import { addprojectAPI } from '../Services/allApi';
import { addproductResponseContext } from '../Context/Contextshare';
import { Link } from 'react-router-dom';

const Addproject = () => {

  const { addproductResponse, setAddproductResponce } = useContext(addproductResponseContext)

  const [productDetails, setProductDetails] = useState({
    productname: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    size: "",
    color: "",
    imageUrl: "",
    userId: ""
  });

  const [token, setToken] = useState('')
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (localStorage.getItem("existingUser") && sessionStorage.getItem("token")) {
      const userId = JSON.parse(localStorage.getItem("existingUser"))._id
      setProductDetails(prev => ({ ...prev, userId }));
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  useEffect(() => {
    if (productDetails.image) {
      setPreview(URL.createObjectURL(productDetails.image))
    }
  }, [productDetails.image])

  const handleaddproduct = async (e) => {
    e.preventDefault();
    const { productname, description, price, category, brand, color, size, imageUrl, userId } = productDetails;

    if (!productname || !description || !price || !category || !brand || !color || !imageUrl || !userId) {
      alert("Please fill the form completely!");
      console.log(productDetails);
    } else {
      const reqbody = new FormData();
      reqbody.append("productname", productname);
      reqbody.append("description", description);
      reqbody.append("price", price);
      reqbody.append("category", category);
      reqbody.append("brand", brand);
      reqbody.append("color", color);
      reqbody.append("size", size);
      reqbody.append("imageUrl", imageUrl); 
      reqbody.append("userId", userId);

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`
      }

      const result = await addprojectAPI(reqbody, reqHeader);
      if (result.status === 200) {
        alert(`Product ${result.data.productname} added successfully.`);
        setProductDetails({
          productname: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          size: "",
          color: "",
          image: "",
          userId
        });
        setPreview("");
        setAddproductResponce(result.data);
      } else {
        alert(result.data);
        console.log(result);
      }
    }
  }

  return (
    <div className='addproject container'>
      <h1>Add Product</h1>
      <Form className='addprojectform border'>
        <Form.Group className="mb-3" controlId="formBasicproductname">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" value={productDetails.productname} onChange={e => setProductDetails({ ...productDetails, productname: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicdescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" value={productDetails.description} onChange={e => setProductDetails({ ...productDetails, description: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter Price" value={productDetails.price} onChange={e => setProductDetails({ ...productDetails, price: e.target.value })} />
        </Form.Group>

        <Form.Select aria-label="Category" className="form-select" value={productDetails.category} onChange={(e) =>setProductDetails({ ...productDetails, category: e.target.value })}>
        <option value="">Select Category</option>
        <option value="laptop">Laptop</option>
        <option value="mobile">Mobile</option>
        <option value="perfume">Perfume</option>
        <option value="watch">Watch</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicbrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="Enter Brand" value={productDetails.brand} onChange={e => setProductDetails({ ...productDetails, brand: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicsize">
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" placeholder="Enter size" value={productDetails.size} onChange={e => setProductDetails({ ...productDetails, size: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiccolor">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" placeholder="Enter Color" value={productDetails.color} onChange={e => setProductDetails({ ...productDetails, color: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImageUpload">
          <Form.Label htmlFor="imageInput">
            <p>Add Image</p>
            <input id='imageInput' type="file" style={{ display: 'none' }} onChange={e => setProductDetails({ ...productDetails, imageUrl: e.target.files[0] })} />
            <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='img-fluid' src={preview ? preview : "https://cdn5.vectorstock.com/i/1000x1000/57/99/select-image-vector-11215799.jpg"} alt="product preview" />
          </Form.Label>
        </Form.Group>

        <div className='p-2 buttons'>
        <Button variant="primary" type="submit" onClick={handleaddproduct}>
          Add Product
        </Button>

        <Link to={'/dashboard'}><Button style={{marginLeft:'10px'}} variant="primary" type="submit" >
          View All Product
        </Button></Link>
        </div>
      </Form>
    </div>
  )
}

export default Addproject;
