const logOutBtn = document.querySelector('.logout');

// console.log(host, port, window.location.protocol);
// const url = port.length
//   ? `${window.location.protocol}//${host}:${port}`
//   : `${window.location.protocol}//${host}`;
console.log(`hi from index ${url}`);
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${url}/user/logout`,
    });
    if ((res.data.status = 'success')) location.assign('/login');
  } catch (err) {
    console.log(err);
    alert(err);
    // alert('Error logging out! Try again.');
  }
};

if (logOutBtn) logOutBtn.addEventListener('click', logout);
