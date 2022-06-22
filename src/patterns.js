export const mobileNumberFormat = /[0-9]{10}/;
export const passwordPattern =
  /(?=(.*\d){2,})(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[!@#$%]){2,})/;
export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const firstNameCheck = /[a-zA-Z]{2,50}/;
export const lastNameCheck = /[a-zA-Z]{0,}/;
