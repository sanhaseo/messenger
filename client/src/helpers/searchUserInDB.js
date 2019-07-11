const axios = require('axios');

// Request server to search for a user with given username.
// If found, return true. Else return false.
// FUTURE IMPROVEMENT: Return different error messages based
// on the response status (400, 500, etc.).
const searchUserInDB = async username => {
  try {
    const userExists = await axios.get(`/api/users/${username}`);
    if (userExists) return true;
    return false;
  } catch (err) {
    return false;
  }
};

export default searchUserInDB;