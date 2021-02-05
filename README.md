# Twitter Clone

Features:
- Lazy Loading for Authenticated User & Unautheticated User
- Signup/Login/Logout
- Views
    - Home
    - Explore
    - Notification
    - Profile
      - Tweets/Likes
      - Followers/Following
- (Soon) Notification when you missed tweets
- (Soon) Read API - Profile View - Feed View
- (Soon) Write API (Everyone || Follower Only) - Profile View - Feed View
- (Soon) Search API - (Global Read Based on Keyword)

---------------------------------------------------------------------------

## Setup mongoDB
MongoDB on cloud is used for authentication purpose.
To setup, under app.js, insert mongoDB URI string under mongoose.connect()

---------------------------------------------------------------------------

## Setup redis database
Redis-server is used for application database.

### Install redis
sudo apt-get install redis-server

### Run redis-server
sudo service redis-server start

---------------------------------------------------------------------------

## Development

### Run server
yarn serve

### Run client
yarn start

### Run redis on linux
redis-cli

---------------------------------------------------------------------------