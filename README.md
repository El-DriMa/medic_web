## MedicLab Frontend
Welcome to the MedicLab Frontend repository. This project contains the Vue.js application for interacting with the MedicLab API. It is hosted on Vercel and provides a user interface for managing users within the system.

## Overview
The frontend application allows admin users to log in, view and manage users, and perform administrative tasks. It consumes data from the MedicLab API and provides a responsive interface.

## Features

### Authentication:

- Login interface for admin users with fields for username and password.
- Displays a loader during authentication and shows error messages for incorrect credentials.
- Redirects to the Home screen upon successful login.

### Home Screen:

- Displays a list of all users with fields: ID, Name, Username, Last Login Date.
- Clickable user items open a detailed information popup, allowing admins to edit and block users.

### Register User:

- Admins can register new users via a form accessible from the Home screen.
- Form includes fields for username, password, name, orders, image URL, and date of birth.

## Deploy
The application is deployed on Vercel.
