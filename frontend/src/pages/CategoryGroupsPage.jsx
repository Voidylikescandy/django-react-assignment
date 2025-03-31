import React, { useState, useEffect } from 'react';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CategoryGroups from '../components/CategoryGroups';
import { itemApi } from '../services/api';

const CategoryGroupsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    setLoading(true);
    try {
      let allItems = [];
      let page = 1;
      let hasMorePages = true;
      
      // Fetch all pages of results
      while (hasMorePages) {
        const response = await itemApi.getAll({ 
          page: page,
          page_size: 100 // Get more items per page to reduce number of requests
        });
        
        const { results, count } = response.data;
        allItems = [...allItems, ...results];
        
        // Check if we've fetched all items
        hasMorePages = allItems.length < count;
        page += 1;
        
        // Safety check to prevent infinite loops
        if (page > 10) break;
      }
      
      setItems(allItems);
      setError(null);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid="lg">
      <div className="d-flex align-items-center mb-4">
        <Button 
          as={Link} 
          to="/" 
          variant="outline-secondary" 
          className="me-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to List
        </Button>
        <h1>Category Analysis</h1>
      </div>

      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="text-muted text-center mb-3">
            Total items: {items.length}
          </div>
          <CategoryGroups items={items} />
        </>
      )}
    </Container>
  );
};

export default CategoryGroupsPage; 