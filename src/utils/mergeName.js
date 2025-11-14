export const mergeName = (firstName, lastName) => {
  if (lastName === undefined) {
    return firstName;
  } else {
    return `${firstName} ${lastName}`;
  }
};
