const { checkFollowing, getFollowing, getFollowers, getFollowersDetails, getProfileJSON } = require('./Profile');

// getFollowersJSON("6010f7c30656b406cca701b0").then(res => console.log(res))

// getFollowersDetails("60129bb3e17a63215420499e", "6010f7c30656b406cca701b0")
//     .then((res) => console.log(res))

// ['60129bb3e17a63215420499e']
// getFollowers("6010f7c30656b406cca701b0")
//     .then(ids => ids.map(id => {
//         getFollowersDetails("60129bb3e17a63215420499e", id)
//             .then(eachJSON => return eachJSON)
//     }))
//     .then(res => console.log(res))

async function ee() {
    const allFollowingUser = await getFollowers("6010f7c30656b406cca701b0");
    // const arr = allFollowingUser.map(async (userID) => {
    //     getFollowersDetails("60129bb3e17a63215420499e", userID).then((res) => return res)
    // })
    return allFollowingUser
}

// ee().then(res => console.log(res))
// ee().then(ids => {
//     ids.map(id => getFollowersDetails("60129bb3e17a63215420499e", id))
// }).then(console.log)

// getProfileJSON("6010f7c30656b406cca701b0")
//     .then(({ id, username, fullname }) => {
//         checkFollowing("60129bb3e17a63215420499e", id)
//             .then(followingStatus => { username, fullname, followingStatus })
//     })
// .then(console.log)
// console.log(username)

// checkFollowing("60129bb3e17a63215420499e", "6010f7c30656b406cca701b0").then(console.log)

// console.log(getFollowersDetails("60129bb3e17a63215420499e", "6010f7c30656b406cca701b0"))
// function converter(id) {
//     return { username: id + "junior" }
// }

// let arr = []
// getFollowing("60129bb3e17a63215420499e")
//     .then(ids => {
//         return ids.forEach(id => {
//             return getFollowersDetails("60129bb3e17a63215420499e", id).then(xx => arr.push(xx))
//         })
// })

// setInterval(() => {
//     console.log(arr)
// }, 1000);
// async function ee() {
//     const data = await getFollowers("6010f7c30656b406cca701b0");
//     return Promise.all(data.map(d => getFollowersDetails('60129bb3e17a63215420499e', d)))
//     // const json = await getFollowersDetails('60129bb3e17a63215420499e', '60129bb3e17a63215420499e')
//     // return json
// }

// ee().then(console.log)