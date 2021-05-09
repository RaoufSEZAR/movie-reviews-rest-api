# movie-reviews-rest-api
# movie-reviews-rest-api for dcs cairo using postman,node.js,mongdb,mongoose, jwt and express.js
Node.Js Project

required to create a backend for a movie reviews app.

# User flows

The app should implement the following user flows
 A user can login to add movies for others to view.
 A user can login to review movies that are already added.
 A user can view movies and its reviews without the need to login.

# Data Models

The app should include the movie, review and user models.

# Movie model

property type
name string
genre string
year string
actors string[]
reviews string[]

# Review model

property type
Movie Id string
rate number
description string
title string

# User model

property type
email string
password string

# Backend APIs
 
# Users APIs

 POST api/users/signup allow the user to sign up.
 POST api/users/login allow the user to login.

# Movies APIs

 GET api/movies should get all the movies.
 POST api/movies should add a movie.
 DELETE api/movies/:id delete a movie by id.
 PATCH api/movies/:id edit a movie by id.

# Reviews APIs

 GET api/reviews should get all the reviews.
 POST api/reviews should add a review.
 DELETE api/reviews/:id delete a review by id.
 PATCH api/reviews/:id edit a review by id.
