## YelpCamp

![YelpCamp Image](public/images/YelpCamp.png)

<!-- Live App: https://yelpcamp-s39h.onrender.com/ -->

## Introduction

YelpCamp is a full-stack web application that enables users to explore and review campgrounds. It provides a comprehensive platform for discovering and sharing experiences at various campgrounds, making it ideal for camping enthusiasts looking to plan their next adventure or seek inspiration from others in the community.

## Table of Contents

- [Features](#features)
- [Planning and Designing](#planning-and-designing)
- [Running it locally](#running-it-locally)

## Features:

* Secure User Authentication: Easily sign up, log in, and access exclusive features like adding new campgrounds and leaving reviews.
* Comprehensive Campground Listings: Browse detailed campsite information including reviews, ratings, amenities, and photos.
* User Contributions: Enrich the platform by adding new campgrounds with essential details and images.
* Adding New Campgrounds: Registered users can add new campgrounds to the platform. This typically involves providing information such as name, description, location, and uploading images.
* Reviews and Ratings: Share experiences to help others make informed decisions.
* Interactive Maps: Explore campground locations with ease.
* Efficient Search and Filtering: Find campgrounds based on location, amenities, or ratings.
* Responsive Design: Enjoy seamless usability across devices.
* Logical RESTful Routing: Navigate intuitively with structured URL patterns.
* Persistent Data Storage: Ensure data continuity and reliability with MongoDB.

## Planning and Designing

* Define the features and functionality of YelpCamp, including user authentication, campground listings, reviews, etc.

## Building the Frontend:
* Develop the frontend with HTML, CSS, and JavaScript.
* Use EJS templating for dynamic HTML.
* Create responsive layouts using Bootstrap.
* Implement client-side validation and error handling.

## Creating the Backend:
* Set up the backend with Node.js and Express.js.
* Configure middleware for requests, JSON parsing, and static files.
* Implement user authentication with Passport.js.
* Define MongoDB models for data storage.
* Create RESTful routes for CRUD operations.

## Integrating User Authentication:
* Create authentication routes for registration, login, and logout.
* Implement middleware for route protection.
* Manage sessions and cookies for user sessions.

## Implementing Campground Features:
* Develop routes and views for campground listings.
* Enable campground addition with forms.
* Add features like image uploads and maps.

## Adding Review Functionality:
* Create routes and views for campground reviews.
* Allow users to add, edit, and delete reviews.
* Calculate and display average ratings.

## Testing and Debugging:
* Test functionality across browsers and devices.
* Debug encountered issues.

## Deployment:
* Choose a hosting provider and deploy the app.
* Set up MongoDB Atlas for production data storage.

## Continuous Improvement:
* Monitor performance and security.

## Running it locally:

1. **Install MongoDB.**
2. **Create Accounts:**
    - Create a Cloudinary account to obtain an API key and secret code.
    - Create a Mapbox account to get an access token.

3. **Install Node:**
    - You can use the Node Version Manager (nvm) for installation.

4. **Clone Repository:**
    ```
    git clone git@github.com:jpdieter/YelpCamp.git
    cd YelpCamp
    npm install
    ```

5. **SSH-Based Authentication:**
    - If using SSH-based authentication:
        ```
        git clone git@github.com:jpdieter/YelpCamp.git
        ```

6. **Environment Variables:**
    - Create a `.env` file or manually export variables in the terminal:
        ```
        cp sample.env .env
        ```

7. **Run the Application:**
    - Open another terminal and run:
        - `mongod`
    - Run the application:
        - `node app.js` or `nodemon app.js` if using nodemon.
    - Access the application at `localhost:3000`.
