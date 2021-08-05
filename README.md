
# Todo Application 2.0 [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

This is the remake of the previous Todo application with user authentication.


## Appendix

This app uses ReactJS to display the UI to the browser and uses python-django to make rest api calls using the frontnend app.
## Features

- Login/Signup
- Add/Delete a task
- Modal view of a specific task
- User specific tasks
- Authenticate users
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

### Run the backend server

Go to the backend server

```bash
  cd backend
```

Create the backend virtual environment

```bash
  python3 -m venv backend-env
```

Activate the virtual environment

```bash
  source backend-env/bin/activate
```

Install Requirements.txt

```bash
  pip install -r requirements.txt
```

Run the migrate command to create database locally

```bash
  python3 manage.py migrate
```

Run the backend server

```bash
  python3 manage.py runserver
```

### Run the frontend server

Go to frontend directory

```bash
  cd frontend
```

Install Dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```
## Screenshots

![Login Screen](https://raw.githubusercontent.com/adijoshi82812/personal-todoapp/main/screenshots/1.png) \
![SignUp Screen](https://raw.githubusercontent.com/adijoshi82812/personal-todoapp/main/screenshots/2.png) \
![Main Screen](https://raw.githubusercontent.com/adijoshi82812/personal-todoapp/main/screenshots/3.png) \
![Modal Screen](https://raw.githubusercontent.com/adijoshi82812/personal-todoapp/main/screenshots/4.png)
## Feedback

If you have any feedback, please reach out to me at adijoshi82812@gmail.com
## Authors

- [@Aditya Joshi](https://www.github.com/adijoshi82812)
## 🚀 About Me

I'm a full stack developer. I use python-django at the Back End and react.js at the Front End.