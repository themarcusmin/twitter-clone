# Run redis-server
sudo service redis-server start

# Open redis command-line interface
redis-cli

**Use Case: Register Account**
- Create a user in MongoDB for Auth
- Create a profile in redis for general purpose
- Set JWT cookie
- Redirect to homepage

**Use Case: Login to Account**
- Set JWT cookie
- Redirect to homepage