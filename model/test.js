const { checkFollowsBack } = require('./Profile');


// checkFollowsBack("6016b90d0dca0016fc624155", "60129bb3e17a63215420499e").then(console.log)

const redis = require('redis');
const client = redis.createClient();

async function poster() {
    const incr_testid = client.incr("test", () => {
        console.log("test incremented");
    })
    const get_testid = client.get("test", (err, value) => {
        console.log(`test value is ${value}`);
        return value;
    })
    const print = (execute) => console.log(execute)
    return await Promise.all([
        incr_testid,
        get_testid,
        print(get_testid)
    ])
}

// poster()

// client.get("test", (err, value) => {
//     console.log(value)
//     return value
// })

const getter = () => new Promise((resolve, reject) => {
    client.get("test", (err, val) => {
        if (err) reject(err)
        else resolve(err)
    })
})


// client.hmset('test:' + client.get("test"), "name", "polly", "age", 30)
// const x = client.get("test", (err, value) => {
//     if (err) console.log(err)
//     else console.log(value)
// })

// Test complete
const { postTweet, postDeleteTweet } = require('./Tweet')

// postTweet("987", "Orange farms", "water", "waterman")
// postDeleteTweet("10a85f3b-9e22-48ce-a596-eab759a26f21", "987")