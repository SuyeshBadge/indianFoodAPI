const logOutBtn = document.querySelector('.logout');

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://indian-food-db.herokuapp.com/user/logout',
    });
    if ((res.data.status = 'success')) location.assign('/login');
  } catch (err) {
    console.log(err);
    alert(err);
    // alert('Error logging out! Try again.');
  }
};

if (logOutBtn) logOutBtn.addEventListener('click', logout);
