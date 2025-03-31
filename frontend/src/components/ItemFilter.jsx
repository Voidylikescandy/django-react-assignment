import React from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { itemApi } from '../services/api';

const ItemFilter = ({ filters, onFilterChange, onResetFilters }) => {
  const categories = itemApi.getCategories();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    onFilterChange({ ...filters, [name]: newValue });
  };

  const handleReset = () => {
    onResetFilters();
  };

  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h4>Filter Items</h4>
      <Form>
        <Row className="g-3">
          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search by name..."
                value={filters.search || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category || ''}
                onChange={handleChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label>Price Range</Form.Label>
              <Row>
                <Col>
                  <InputGroup size="sm">
                    <InputGroup.Text>Min</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price_min"
                      value={filters.price_min || ''}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup size="sm">
                    <InputGroup.Text>Max</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price_max"
                      value={filters.price_max || ''}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label>Stock Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="All"
                  name="in_stock"
                  id="all-stock"
                  value=""
                  checked={filters.in_stock === undefined || filters.in_stock === ''}
                  onChange={() => onFilterChange({ ...filters, in_stock: '' })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="In Stock"
                  name="in_stock"
                  id="in-stock"
                  value="true"
                  checked={filters.in_stock === 'true'}
                  onChange={() => onFilterChange({ ...filters, in_stock: 'true' })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Out of Stock"
                  name="in_stock"
                  id="out-of-stock"
                  value="false"
                  checked={filters.in_stock === 'false'}
                  onChange={() => onFilterChange({ ...filters, in_stock: 'false' })}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-3 text-end">
          <Button variant="secondary" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ItemFilter; 