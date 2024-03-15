import parse from "date-fns/parse";
import * as Yup from 'yup';

export const orderValidationSchema = Yup.object().shape({
    customer_name: Yup.string()
    .min(2, 'Customer Name must be minimum 2')
    .max(100, 'Customer Name must not be more than 100 characters')
    .required('Customer Name is required'),
    order_date: Yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd/MM/yyyy", new Date());
      return result;
    })
    .min(new Date(), 'Order date cannot be before the current date')
    .required('Order date is required'),
    status: Yup.string()
      .min(6, 'Status must be at least 6 characters')
      .required('Status is required'),
});