import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, formatDate, capitalize } from '../utils/formatters';

const ItemTable = ({ 
  items, 
  onEdit, 
  onDelete, 
  onSort, 
  sortField, 
  sortDirection 
}) => {
  const getSortIcon = (field) => {
    if (sortField !== field) return <FontAwesomeIcon icon={faSort} />;
    return sortDirection === 'asc' 
      ? <FontAwesomeIcon icon={faSortUp} /> 
      : <FontAwesomeIcon icon={faSortDown} />;
  };

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, direction);
  };

  const getCategoryBadge = (category) => {
    const colors = {
      electronics: 'primary',
      clothing: 'success',
      food: 'warning',
      books: 'info',
      other: 'secondary'
    };
    
    return (
      <Badge bg={colors[category] || 'secondary'}>
        {capitalize(category)}
      </Badge>
    );
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            Name {getSortIcon('name')}
          </th>
          <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
            Price {getSortIcon('price')}
          </th>
          <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
            Category {getSortIcon('category')}
          </th>
          <th>In Stock</th>
          <th onClick={() => handleSort('created_at')} style={{ cursor: 'pointer' }}>
            Created At {getSortIcon('created_at')}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{getCategoryBadge(item.category)}</td>
              <td>
                <Badge bg={item.in_stock ? 'success' : 'danger'}>
                  {item.in_stock ? 'Yes' : 'No'}
                </Badge>
              </td>
              <td>{formatDate(item.created_at)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-1" 
                  onClick={() => onEdit(item)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => onDelete(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No items found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ItemTable; 