import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { itemApi } from '../services/api';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string(),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Price must be a number'),
  category: Yup.string().required('Category is required'),
  in_stock: Yup.boolean()
});

const ItemForm = ({ show, handleClose, item, onSave }) => {
  const categories = itemApi.getCategories();
  const isEditMode = Boolean(item?.id);
  
  const initialValues = {
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || '',
    category: item?.category || 'other',
    in_stock: item?.in_stock === undefined ? true : item.in_stock
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (isEditMode) {
        response = await itemApi.update(item.id, values);
      } else {
        response = await itemApi.create(values);
      }
      onSave(response.data);
      handleClose();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Item' : 'Create New Item'}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.category && errors.category}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="In Stock"
                  name="in_stock"
                  checked={values.in_stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ItemForm; 