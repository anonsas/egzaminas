export const getAllBooks = async () => {
  try {
    const response = await fetch(`http://localhost:4000/books`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const createNewBook = async (postData) => {
  try {
    const response = await fetch(`http://localhost:4000/books`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const getBookByUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:4000/books/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};
