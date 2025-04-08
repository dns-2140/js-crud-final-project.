const globalState = {
  users: [],
};

const userList = document.querySelector('.userList');
const openModalBtn = document.querySelector('#open');

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

fetchData();

//dialog and form
const dialog = document.getElementById('myDialog');
const modalForm = dialog.querySelector('#dialogForm');
console.log('ini adlaah modal form', modalForm);

modalForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(modalForm);
  const formObject = Object.fromEntries(formData.entries());
  console.log(formData);
  console.log(formObject);
  const { name, username, email, address } = formObject;
  const newUserData = {
    name,
    username,
    email,
    address: {
      street: address,
    },
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
  modalForm.reset();
  dialog.close();
});

const handleEdit = (id) => {
  const updateDialog = document.getElementById('updateDialog');
  const updateForm = updateDialog.querySelector('#updateForm');
  console.log(updateDialog);
  console.log(updateForm);

  const user = globalState.users.find((user) => user.id === id);

  document.getElementById('updateName').value = user.name;
  document.getElementById('updateUsername').value = user.username;
  document.getElementById('updateEmail').value = user.email;
  document.getElementById('updateAddress').value = user.address.street;
  updateDialog.showModal();
  updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('submit');
    const formData = new FormData(updateForm);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formData);
    console.log(formObject);
    const { name, username, email, address } = formObject;
  });
};
