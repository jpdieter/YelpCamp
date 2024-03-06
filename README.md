## YelpCamp

Live App: https://yelpcamp-s39h.onrender.com/

## Introduction

YelpCamp is a full-stack web application where users can explore and review campgrounds. The application covers a range of web development concepts and technologies, including front-end development with HTML, CSS, and JavaScript, back-end development with Node.js and Express.js, database management with MongoDB, user authentication, and more.


## Features:

1. User Authentication: Users can sign up, log in, and log out securely. Authentication ensures that only registered users can access certain features like adding new campgrounds or leaving reviews.
2. Campground Listings: The main feature of YelpCamp is the ability to view a list of campgrounds. Each campground listing usually includes details such as name, description, location, and images.
3. Campground Details: Users can click on individual campgrounds to view more detailed information, such as reviews, ratings, amenities, and photos.
4. Adding New Campgrounds: Registered users can add new campgrounds to the platform. This typically involves providing information such as name, description, location, and uploading images.
5. Reviews and Ratings: Users can leave reviews and ratings for campgrounds they have visited. These reviews often include a rating scale (e.g., out of 5 stars) and a text-based review.
6. Interactive Maps: Campground listings may include interactive maps showing the location of each campground.
7. Search and Filtering: Users can search for campgrounds based on various criteria such as location, amenities, or user ratings. Filtering options allow users to narrow down their search results.
8. Responsive Design: The application is designed to be responsive, ensuring that it works well on a variety of devices, including desktops, tablets, and smartphones.
9. RESTful Routing: The application follows RESTful routing principles to structure the URLs and routes logically.
10. Data Persistence: Campground data is stored in a database, typically MongoDB, to ensure that information is persistent across sessions.

## Dependencies 
    "@mapbox/mapbox-sdk": "^0.15.3",
    "cloudinary": "^1.41.3",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^3.2.0",
    "dotenv": "^16.4.4",
    "ejs": "^3.1.9",
    "ejs-mate": "^4.0.0",
    "express": "^4.18.2",
    "express-mongo-sanitize": "^2.2.0",
    "express-session": "^1.18.0",
    "helmet": "^7.1.0",
    "joi": "^17.11.0",
    "method-override": "^3.0.0",
    "mongoose": "^8.0.3",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
    "nodemon": "^3.0.2",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^8.0.0",
    "sanitize-html": "^2.12.1"

## Planning and Designing

* Define the features and functionality of YelpCamp, including user authentication, campground listings, reviews, etc.

## Building the Frontend:
* Develop the frontend using HTML, CSS, and JavaScript.
* Use templating engine EJS to generate dynamic HTML content.
* Design responsive layouts using the CSS framework Bootstrap.
* Implement client-side form validation and error handling with JavaScript.

## Creating the Backend:
* Set up the backend server using Node.js and Express.js.
* Configure middleware for handling requests, parsing JSON, and serving static files.
* Implement user authentication using Passport.js with the Local Strategy.
* Define database models using MongoDB and Mongoose for campgrounds, users, and reviews.
* Create RESTful routes for CRUD operations on campgrounds and reviews.

## Integrating User Authentication:
* Create routes for user authentication, including registration, login, and logout.
* Implement authentication middleware to protect routes that require user authentication.
* Set up sessions and cookies for managing user sessions.
