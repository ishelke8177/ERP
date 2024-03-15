import * as Yup from 'yup';

export const addEditItemValidationSchema = Yup.object().shape({
    category_name: Yup.string()
    .required('Category Name is required'),
    specific_item: Yup.string().required('Item name required'),
    quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be a positive number') 
    .integer('Quantity must be an integer'),
    price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number') 
    .min(0.01, 'Price must be greater than 0'), 
    image_name: Yup.string().required('Image is required')
});
