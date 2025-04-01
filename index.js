const globalState = {
  users: [],
};

const userList = document.querySelector('.userList');
const submitBtn = document.querySelector('#submit');

const handleEdit = (id) => {
  console.log(id);
  updateUser(id);
};

const handleDelete = (id) => {
  console.log(id);
  deleteUser(id);
};

const updateDom = () => {
  userList.innerHTML = '';
  globalState.users.map((user) => {
    userList.insertAdjacentHTML(
      'beforeend',
      `<tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.address.street}</td>
      <td class="buttons-container">
      <a 
      class="editBtn" 
      onclick="handleEdit(${user.id})"><button>edit</button></a>
      <a class="deleteBtn" onclick="handleDelete(${user.id})"><button>delete</button></a>
      </td>
      
      <tr>`
    );
  });
};

const fetchData = async () => {
  try {
    const users = await axios('https://jsonplaceholder.typicode.com/users');
    globalState.users = [...users.data];
    console.log(globalState.users);
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

const updateUser = async (id) => {
  const updatedUser = {
    name: 'Davidddddd',
    username: 'dns2140000',
  };
  try {
    //update server
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedUser
    );
    console.log('Updated user:', response.data);

    //update global state

    //findIndex
    const userIndex = globalState.users.findIndex(
      (user) => user.id === parseInt(id)
    );

    //validation
    if (userIndex === -1) {
      console.log('user not found');
    }

    //update global state
    globalState.users = [
      ...globalState.users.slice(0, userIndex),
      {
        ...globalState.users[userIndex],
        ...updatedUser,
      },
      ...globalState.users.slice(userIndex + 1),
    ];

    updateDom();

    console.log('found user:', userIndex);
  } catch (error) {
    console.log('there is an error', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    //update server
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    console.log('Deleted user:', response.data);

    //update global state
    globalState.users = globalState.users.filter(
      (user) => user.id !== parseInt(id)
    );

    updateDom();
  } catch (error) {
    console.log('there is an error', error);
  }
};

submitBtn.addEventListener('click', () => {
  postData();
});

fetchData();
