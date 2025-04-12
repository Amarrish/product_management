import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { addproductResponseContext, editproductResponseContext } from '../Context/Contextshare';
import { deleteproductAPI, userProductAPI } from '../Services/allApi';
import { BASEURL } from '../Services/baseUrl';

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceLimit, setPriceLimit] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const navigate = useNavigate()

  const { addproductResponse } = useContext(addproductResponseContext);
  const { editproductResponse, setEditProductResponse } = useContext(editproductResponseContext);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getuserProducts();
    }
  }, [token, addproductResponse]);

  const getuserProducts = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    };

    const result = await userProductAPI(reqHeader);
    if (result.status === 200) {
      setProducts(result.data);
      setFilteredProducts([]); // Reset filter on new fetch
    } else {
      alert(result.response.data);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("existingUser")) {
      setUsername(JSON.parse(localStorage.getItem("existingUser")).email.toUpperCase());
    }
  }, []);

  const handleDelete = async (productId) => {
    const reqHeader = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    };

    const result = await deleteproductAPI(productId, reqHeader);
    if (result.status === 200) {
      alert('Product deleted successfully');
      getuserProducts(); // refresh
    } else {
      alert(result.response?.data || 'Failed to delete');
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const handleFilterApply = (e) => {
    e.preventDefault();
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category.toLowerCase()));
    }

    if (priceLimit) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceLimit));
    }

    if (colorFilter) {
      filtered = filtered.filter(product => product.color.toLowerCase().includes(colorFilter.toLowerCase()));
    }

    setFilteredProducts(filtered);
  };

  const handleClearFilter = () => {
    setSelectedCategories([]);
    setColorFilter('');
    setPriceLimit('');
    setFilteredProducts([]);
  };


  const handlelogout = ()=>{
    sessionStorage.removeItem('token')
    localStorage.removeItem('existingUser')
    localStorage.removeItem('Role')
    navigate('/')
  }

  return (
    <div className='dashboard container-fluid py-4'>
      <Row>
        {/* Filter Sidebar */}
        <Col xs={12} sm={4} md={4} lg={3} className='mb-4'>
          <div className="border rounded p-3 shadow-sm bg-light">
            <h4 className="mb-3">Category Filtering</h4>
            <form onSubmit={handleFilterApply}>
              {/* Price Filter */}
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price Upto</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Enter price"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(e.target.value)}
                />
              </div>

              {/* Category Checkboxes */}
              <div className="mb-3">
                <p className="mb-2 fw-semibold">Category</p>
                {['Mobile', 'Watch', 'Perfume', 'Laptop'].map((item, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={item.toLowerCase()}
                      id={`cat-${item}`}
                      onChange={handleCategoryChange}
                      checked={selectedCategories.includes(item.toLowerCase())}
                    />
                    <label className="form-check-label" htmlFor={`cat-${item}`}>
                      {item}
                    </label>
                  </div>
                ))}
              </div>

              {/* Color Filter */}
              <div className="mb-3">
                <label htmlFor="colorInput" className="form-label">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="colorInput"
                  placeholder="Enter color"
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                />
              </div>

              <div className='d-flex gap-2'>
                <button className='btn text-white' style={{backgroundColor:'#7b2fed'}} type="submit">Apply Filter</button>
                <button className='btn btn-secondary' type="button" onClick={handleClearFilter}>Clear</button>
              </div>
            </form>
            
          </div>
          <button onClick={handlelogout}  className='btn mt-2 text-white fw-bold' style={{backgroundColor:'#1c6fff'}} type="button">SignOut</button>
        </Col>

        {/* Products Section */}
        <Col xs={12} sm={8} md={8} lg={9}>
          <div className="p-3 border rounded shadow-sm bg-white">
            {/* Header with Button */}
            <div className='d-flex justify-content-between align-items-center mb-3 border-bottom pb-2'>
              <p className="mb-3 fw-bold">User Profile: {username}</p>
              <h5 className='mb-0'>Product Listings</h5>
              <Link to={'/addproduct'}><Button className='btn btn-info text-white'>Add Product</Button></Link>
            </div>

            {/* Cards Grid */}
            <Row className='g-4'>
              {
                (filteredProducts.length > 0 ? filteredProducts : products).length > 0 ? (
                  (filteredProducts.length > 0 ? filteredProducts : products).map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={6} lg={4}>
                      <Card className="h-100 shadow-sm">
                        <Card.Img variant="top" src={item.imageUrl ? `${BASEURL}/uploads/${item.imageUrl}` : "https://via.placeholder.com/150x100"} />
                        <Card.Body>
                          <Card.Title>{item.productname}</Card.Title>
                          <Card.Text><strong>Price:</strong> ₹{item.price}</Card.Text>
                          <Card.Text><strong>Category:</strong> {item.category}</Card.Text>
                          <Card.Text><strong>Brand:</strong> {item.brand}</Card.Text>
                          <Card.Text><strong>Size:</strong> {item.size}</Card.Text>
                          <Card.Text><strong>Color:</strong> {item.color}</Card.Text>
                          <Card.Text className='text-muted'>{item.description}</Card.Text>
                          <div className="d-flex justify-content-between">
                            <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
                            <Button variant="success" size="sm" onClick={() => { setEditProductResponse(item); }}>
                              <Link to={`/updateproduct/${item._id}`} className="text-white text-decoration-none">Edit</Link>
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col><p>No products found.</p></Col>
                )
              }
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
