import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemTable from '../components/ItemTable';
import ItemFilter from '../components/ItemFilter';
import ItemForm from '../components/ItemForm';
import Pagination from '../components/Pagination';
import ConfirmationModal from '../components/ConfirmationModal';
import { itemApi } from '../services/api';

const ItemListPage = () => {
  // State for items and pagination
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  // State for filtering and sorting
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');

  // State for modals
  const [showItemForm, setShowItemForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch items on component mount and when dependencies change
  useEffect(() => {
    fetchItems();
  }, [currentPage, filters, sortField, sortDirection]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      // Prepare query parameters
      const params = {
        page: currentPage,
        ...filters,
        ordering: sortDirection === 'asc' ? sortField : `-${sortField}`,
      };

      // Make API call
      const response = await itemApi.getAll(params);
      
      // Update state with response data
      setItems(response.data.results);
      setTotalItems(response.data.count);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setError(null);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handler for resetting filters
  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  // Handler for sorting
  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Handler for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handlers for item form
  const handleOpenItemForm = (item = null) => {
    setCurrentItem(item);
    setShowItemForm(true);
  };

  const handleCloseItemForm = () => {
    setShowItemForm(false);
    setCurrentItem(null);
  };

  const handleSaveItem = () => {
    fetchItems();
  };

  // Handlers for delete confirmation
  const handleOpenDeleteConfirm = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await itemApi.delete(itemToDelete);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again later.');
    } finally {
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  return (
    <Container fluid="lg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Items</h1>
        <Button 
          variant="primary" 
          onClick={() => handleOpenItemForm()}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Item
        </Button>
      </div>

      {/* Filters */}
      <ItemFilter 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onResetFilters={handleResetFilters} 
      />

      {/* Error alert */}
      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {/* Item table */}
          <ItemTable 
            items={items} 
            onEdit={handleOpenItemForm} 
            onDelete={handleOpenDeleteConfirm}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />

          {/* Total items count */}
          <div className="text-muted text-center mt-2">
            Total items: {totalItems}
          </div>
        </>
      )}

      {/* Item form modal */}
      <ItemForm 
        show={showItemForm} 
        handleClose={handleCloseItemForm} 
        item={currentItem} 
        onSave={handleSaveItem} 
      />

      {/* Delete confirmation modal */}
      <ConfirmationModal 
        show={showDeleteConfirm}
        handleClose={handleCloseDeleteConfirm}
        handleConfirm={handleConfirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmButtonText="Delete"
      />
    </Container>
  );
};

export default ItemListPage; 