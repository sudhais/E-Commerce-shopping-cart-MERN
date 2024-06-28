# E-commerce Shopping Cart

## Project Description

> This project is an E-Commerce web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Redux. The application provides users with features for browsing and purchasing products, managing their shopping cart, and completing secure transactions. It incorporates both frontend and backend functionalities to ensure a seamless user experience

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

### Env Variables

Create a .env file in root then add the following

```
NODE_ENV = development
PORT = 8000
MONG_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

Create a .env file inside the frontend file then add the following
```
VITE_CLIENT_ID = your pay pal client id
```

### Install Dependencies (frontend & root)

#### root

```
npm install

or 

npm run server
```

#### frontend
```
cd frontend
npm install
npm run build

or 

npm run client-build
```

#### (frontend & backend both)
```
npm run build
```

### Run

```
# Run backend (in root folder)
npm start
    or
    using nodemon
npm run server
```

#Run frontend
````
npm run dev

  or in root
npm run client

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample Users Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## License

© 2024 Sudhais F.M


