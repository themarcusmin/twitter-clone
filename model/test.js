const { follow } = require('./Profile');

// let user11 = new Profile(457, 'mrblack', 'ironman')
// Promise.all([user11.follow(456), user11.incrTweet(), user11.incrTweet(), user11.decrTweet(), user11.incrTweet()]).then(val => console.log(val));
// user11.getJSON()
// console.log(createProfile(200, 'white', 'fang'));
// let jj = getProfileJSON(200)
// jj.then(res => console.log(res))

// checkFollowing('60129bb3e17a63215420499e', '6010f7c30656b406cca701b0').then(res => console.log(res))

// .then(res => console.log(res))
// async function dd() {
//     const data = await checkFollowing('123', '321')
//     console.log(data)

// }

// dd()

// async function ee() {
//     const data = await follow(123, 321)
//     return data
// }
follow(123, 321).then(res => console.log("Success")).catch(err => console.log("Error: ", err));
// console.log(follow(123, 321))
// // console.log(ee())
// console.log(ee())
// follow(123, 321).then(res => console.log(res)).catch(err => console.log("err: ", err))