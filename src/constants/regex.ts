export const regex = {
  phone: /^09\d{9}$/,
  postalCode: /^\d{10}$/,
  nationalCode: /^\d{10}$/,
  cardNumber: /^\d{16}$/,
  shebaNumber: /^\d{24}$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})/
};
