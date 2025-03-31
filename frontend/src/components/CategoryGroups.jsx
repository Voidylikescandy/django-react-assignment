import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { formatCurrency, capitalize } from '../utils/formatters';

const CategoryGroups = ({ items }) => {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Calculate summary statistics
  const categorySummary = Object.keys(groupedItems).map(category => {
    const categoryItems = groupedItems[category];
    const totalItems = categoryItems.length;
    const inStockItems = categoryItems.filter(item => item.in_stock).length;
    const totalValue = categoryItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const avgPrice = totalValue / totalItems;
    
    return {
      category,
      totalItems,
      inStockItems,
      totalValue,
      avgPrice
    };
  });

  const getCategoryColor = (category) => {
    const colors = {
      electronics: 'primary',
      clothing: 'success',
      food: 'warning',
      books: 'info',
      other: 'secondary'
    };
    return colors[category] || 'secondary';
  };

  return (
    <div className="my-4">
      <h3>Items by Category</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {categorySummary.map(summary => (
          <Col key={summary.category}>
            <Card className="h-100">
              <Card.Header className={`bg-${getCategoryColor(summary.category)} text-white`}>
                {capitalize(summary.category)}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  {summary.totalItems} Items 
                  <Badge bg="success" className="ms-2">
                    {summary.inStockItems} in stock
                  </Badge>
                </Card.Title>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Total Value:</span>
                  <strong>{formatCurrency(summary.totalValue)}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Average Price:</span>
                  <strong>{formatCurrency(summary.avgPrice)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryGroups; 