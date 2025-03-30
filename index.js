const globalState = {
  users: [],
};

const userList = document.querySelector('.userList');
const submitBtn = document.querySelector('#submit');
const updateDom = () => {
  userList.innerHTML = '';
  globalState.users.map((user) => {
    userList.insertAdjacentHTML('beforeend', `<li>${user.name}</li>`);
  });
};
const fetchData = async () => {
  try {
    const users = await axios('https://jsonplaceholder.typicode.com/users');
    globalState.users = [...users.data];
    updateDom();
  } catch (error) {
    console.log('there is an error', error);
  }
};

const postData = async () => {
  const newUserData = {
    name: 'David',
    username: 'dns2140',
  };
  try {
    const newUser = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newUserData
    );
    globalState.users.push(newUser.data);
    updateDom();
  } catch (error) {
    console.log('there is an error', error);
  }
};

const updateUser = async () => {
  const updatedUser = {
    name: 'Davidddddd',
    username: 'dns2140000',
  };
  try {
    const response = await axios.put(
      'https://jsonplaceholder.typicode.com/users/1',
      updatedUser
    );
    console.log('Updated user:', response.data);
  } catch (error) {
    console.log('there is an error', error);
  }
};

const deleteUser = async () => {
  try {
    const response = await axios.delete(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    console.log('Deleted user:', response.data);
  } catch (error) {
    console.log('there is an error', error);
  }
};

submitBtn.addEventListener('click', () => {
  postData();
});

deleteUser();
