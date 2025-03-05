import { InvalidParamError } from "./errors.js";

const isValidDate = d => d instanceof Date && !isNaN(d);

export const formatDate = (date) => {
  const dateObject = new Date(date)
  if (!isValidDate(dateObject)) {
    throw new InvalidParamError(`Invalid date: ${date}`)
  }
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because January is 0
  const day = String(dateObject.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate
}

export const prepareIntegerId = (id) => {
  const idNumber = Number(id)
  if (isNaN(idNumber)) {
    throw new InvalidParamError(`Id param has to be a numeric value`)
  }
  return idNumber
}