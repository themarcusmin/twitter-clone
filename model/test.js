const { getProfileJSON } = require('./Profile');

// let user11 = new Profile(457, 'mrblack', 'ironman')
// Promise.all([user11.follow(456), user11.incrTweet(), user11.incrTweet(), user11.decrTweet(), user11.incrTweet()]).then(val => console.log(val));
// user11.getJSON()
// console.log(createProfile(200, 'white', 'fang'));
let jj = getProfileJSON(200)
jj.then(res => console.log(res))
