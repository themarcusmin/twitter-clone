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

### Create Tweet

Generate unique id with UUID

Save tweet data
hmset tweet:_uuid body _ createdAt _ userID _ fullname _ username _ likesCount 0 

Increment user's tweetCount
hincrby user:_userid tweetCount 1

Add to Global Timeline
zadd globaltimeline unixtime _uuid

Add to Profile Timeline
zadd user:_uid:profiletimeline unixtime _uuid

Add to Followers' User Timeline
zadd user:_uid:usertimeline unixtime _uuid

### Delete Tweet

Delete tweet data
del tweet:_uuid

Decrement user's tweetCount
hincrby user:_userid tweetCount -1

Remove from Global Timeline
zrem globaltimeline  _uuid

Add to Profile Timeline
zrem user:_uid:profiletimeline _uuid

Add to Followers' User Timeline
zrem user:_uid:usertimeline _uuid

### Like Tweet

### Unlike Tweet