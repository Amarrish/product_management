import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ComponentStyle.css'
import { editproductResponseContext } from '../Context/Contextshare';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../Services/baseUrl';
import { updateproductAPI } from '../Services/allApi';

const Updateproject = () => {
  const { editproductResponse } = useContext(editproductResponseContext)
  const [product, setProduct] = useState({
    productname: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    size: '',
    color: '',
    imageUrl: ''
  });

  const [preview, setPreview] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (editproductResponse) {
      setProduct({ ...editproductResponse });
      if (editproductResponse.imageUrl) {
        setPreview(`${BASEURL}/uploads/${editproductResponse.imageUrl}`);
      }
    }
  }, [editproductResponse]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("productname", product.productname)
    formData.append("description", product.description)
    formData.append("price", product.price)
    formData.append("category", product.category)
    formData.append("brand", product.brand)
    formData.append("size", product.size)
    formData.append("color", product.color)
    if (imageFile) formData.append("imageUrl", imageFile)

    const token = sessionStorage.getItem('token')
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await updateproductAPI(editproductResponse._id, formData, reqHeader)
    if (result.status === 200) {
      alert("Product updated successfully!")
      navigate('/dashboard')
    } else {
      alert(result.response?.data || "Failed to update product")
    }
  }

  return (
    <div className='updateproject container'>
      <h1>Update Product</h1>
      <Form className='updateprojectform border' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter productname" name="productname" value={product.productname} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" name="description" value={product.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter Price" name="price" value={product.price} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" value={product.category} onChange={handleChange}>
            <option>Select Category</option>
            <option value="laptop">Laptop</option>
            <option value="mobile">Mobile</option>
            <option value="perfume">Perfume</option>
            <option value="watch">Watch</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="Enter Brand" name="brand" value={product.brand} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" placeholder="Enter Size" name="size" value={product.size} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" placeholder="Enter Color" name="color" value={product.color} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="imageUrl">Product Image</Form.Label><br />
          <input id='imageUrl' type="file" style={{ display: 'none' }} onChange={handleImageChange} />
          <label htmlFor="imageUrl">
            <img src={preview?preview:`${BASEURL}/uploads/${product.imageUrl}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="product" />
          </label>
        </Form.Group>

        <Button variant="primary" type="submit">Update Product</Button>
      </Form>
    </div>
  )
}

export default Updateproject
