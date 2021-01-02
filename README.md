# password-manager
A toy project for learning MySql, Express, React and Node. This project has been made with the help of this [youtube tutorial](https://www.youtube.com/watch?v=q9V7kLXvP3E) by PedroTech. 

1. The password manager uses aes-256-ctr encryption, which I stubmbled upon while making this project itself.
2. Axios has been used for POST requests from client side.
3. CORS is used for connectivity between browser and server.
4. Crypto is used for encryption.


## Server-side Dependencies
```json
{
  "dependencies": {
      "cors": "^2.8.5",
      "express": "^4.17.1",
      "mysql": "^2.18.1",
      "nodemon": "^2.0.6"
  }
}
```

## Client-side Dependencies
```json
{
  "dependencies": {
    "axios": "^0.21.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "web-vitals": "^0.2.4"
  }
}
```

## Secret Configuration
I have kept all the private configuration files for Database and Encryption in config.json (gitignored) at [password-manager/server/](/server/) as follows:
```json
{
    "user": "user_name",
    "host": "localhost",
    "password": "db_password",
    "database": "passwordmanager",
    "encryption_key": "encryption_key_value"
}
```
------------------

