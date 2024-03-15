import * as Yup from 'yup';

export const addItemValidationSchema = Yup.object().shape({
    category_name: Yup.string()
    .min(2, 'Category Name must be minimum 2')
    .max(50, 'Name must not be more than 50 characters')
    .required('Category Name is required'),
    specific_item: Yup.string().required('Item name required'),
    quantity: Yup.number() // Change to number validation
    .required('Quantity is required')
    .positive('Quantity must be a positive number') // Optional: Ensure quantity is positive
    .integer('Quantity must be an integer'), // Optional: Ensure quantity is an integer
    price: Yup.number() // Change to number validation
    .required('Price is required')
    .positive('Price must be a positive number') // Optional: Ensure price is positive
    .min(0.01, 'Price must be greater than 0'), // Optional: Ensure price is greater than 0
    image_name: Yup.string().required('Image is required')
});
