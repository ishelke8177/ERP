# ENTNT Assignment - ERP

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the app
1) Open a terminal in the project folder and run this command: npm install
- This command will install all the required packages to run the app.

2) Then after this run command: npx json-server db.json
   - This command will start the fake json backend server.
   - The endpoints will be
      - http://localhost:3000/items
      - http://localhost:3000/orders

3) Now open another terminal and run command: npm start
- This command will start the front end server at: http://localhost:1234

## Project Overview
This project contains 3 pages namely: Dashboard, Products and Orders   
- Dashboard Page:
  - In this page I have shown 3 cards which shows the information
    - Total number of products the app has   
    - Total Orders that has been placed   
    - Total Categories available
- Products Page:
  - This page contains the total products that a user will add.   
  - There is an add Item button at the top right which will open up a form and the user can add product.  
  - There are several cards shown on this page with values such as Item name, price, quantity etc.  
  - In this page when you click on card it will open up a detailed card where a user can edit that particular item  
  - delete or proceed to order that particular item.  
  - If clicked on edit it will open up a form where the user can edit the information.  
  - If clicked on delete then the item will be deleted.  
  - If clicked on order then a form will open up where the user can placed his order.  
- Orders Page:   
   - On this page I have shown a table which shows respective orders and their details such as order id, customer name,  
   status of the order, item name that has been ordered.

## Project TechStack Description
- For front end I have used React.js, reduxToolkit, Tailwind CSS
- For Backend I have used fake backend API i.e. Json-server
- For storing images I have used S3 bucket
- Description of the packages
  - aws-sdk: For storing images to S3 bucket from front end
  - axios: for making API calls
  - date-fns: for manipulating dates.
  - react-redux: for connecting react with redux
  - dotenv: for secret variables
  - react-router-dom: for routing
  - tailwind css: for styling the app
  - parcel:
  - babel: to make the code understandable to the browser
 
## Project Screen Shots
