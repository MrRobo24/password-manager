import './App.css';
import { useState, useEffect } from "react";
import Axios from 'axios';

function App() {

  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);


  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword",
      {
        password: password,
        title: title
      }).then(
        window.location.reload()
      );


  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword",
      {
        password: encryption.password,
        iv: encryption.iv
      }).then((response) => {
        setPasswordList(passwordList.map((val) => {
          return (val.id === encryption.id ?
            { id: val.id, password: response.data, title: val.title }
            : val);
        }))
      });

  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input type="password" placeholder="sample_password123"
          onChange={(event) => {
            setPassword(event.target.value);
          }} />
        <input type="text" placeholder="Ex. Facebook"
          onChange={(event) => {
            setTitle(event.target.value);
          }} />
        <button onClick={addPassword}>Add Password</button>
      </div>

      <div className="Passwords">
        <table className="passwordTable">
          <tbody>
          {passwordList.map((val, key) => {
            return (

              <tr key={key}>
                <td id="title" onClick={
                  () => {
                    decryptPassword({
                      password: val.password,
                      iv: val.iv,
                      id: val.id
                    });
                  }}
                >
                  {val.title}
                </td>
                <td id="passVal">
                  {val.password}
                </td>
              </tr>

            );
          })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
