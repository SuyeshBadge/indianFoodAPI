const loginForm = document.querySelector('.loginForm');
const signupForm = document.querySelector('.signupForm');
const changePasswordForm = document.querySelector('.changePass');
const updateDetails = document.querySelector('.updateDetails');
const forgotPass = document.querySelector('.forgotPass');
const resetPass = document.querySelector('.resetPass');
const host = window.location.hostname;
const port = window.location.port;
console.log(host, port, window.location.protocol);
const url = port.length
  ? `${window.location.protocol}//${host}:${port}`
  : `${window.location.protocol}//${host}`;
console.log(`hi from login ${url}`);
if (loginForm)
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await axios({
        method: 'POST',
        url: `${url}/user/login`,
        data: {
          email,
          password,
        },
      });

      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/');
        }, 0);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });
if (signupForm)
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('Name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password').value;
    try {
      const res = await axios({
        method: 'POST',
        url: `${url}/user/signup`,
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });

      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/');
        }, 0);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });

if (updateDetails) {
  updateDetails.addEventListener('submit', async (e) => {
    console.log(`clicked`);
    e.preventDefault();
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${url}/user/updateMe`,
        data: {
          name,
          email,
        },
      });
      // console.log(`hi`);
      // console.log(res);
      if (res.data.status == 'success') {
        location.reload(true);
        alert('Details Changed Successfully');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}

if (changePasswordForm)
  changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(`form submitted `);
    const passwordCurrent = document.querySelector('.passwordCurrent').value;
    const password = document.querySelector('.password').value;
    const passwordConfirm = document.querySelector('.passwordConfirm').value;
    // console.log(passwordCurrent, password, passwordConfirm);
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${url}/user/updatepassword`,
        data: {
          passwordCurrent,
          password,
          passwordConfirm,
        },
      });
      // console.log(`hi`);
      // console.log(res);
      if (res.data.status == 'success') {
        alert('Password Changed Successfully');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });

if (forgotPass)
  forgotPass.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    try {
      const res = await axios({
        method: 'POST',
        url: `${url}/user/forgotPassword`,
        data: {
          email,
        },
      });
      // console.log(`hi`);
      // console.log(res);
      if (res.data.status == 'success') {
        alert('Reset Token Sent on your email');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });

// console.log(resetPass);
if (resetPass) {
  resetPass.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(`hi from resetpass`);

    const resettoken = document.querySelector('#resettoken').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${url}/user/resetPassword?token=${resettoken}`,
        data: {
          password,
          passwordConfirm,
        },
      });
      // console.log(`hi`);
      // console.log(res);
      if (res.data.status == 'success') {
        alert('Password Changed Successfully');
        location.assign('/me');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}
