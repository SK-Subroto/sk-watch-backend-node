const admin = require("firebase-admin");
const User = require("../models/user");
const serviceAccount = require("../sk-watch-firebase-adminsdk-702rq-6da9177bfe.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function auth(req, res, next) {

    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers?.authorization.split(' ')[1];

        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            const user = await User.findOne({ email: decodedUser.email });

            if (!user) {
                throw new Error()
            }

            req.user = user
            // req.decodedEmail = decodedUser.email;
            next()
        }
        catch (e) {
            res.status(401).send({ error: 'Please authentication' })
        }
    } else {
        res.status(401).send({ error: 'Please authentication' })
    }
    // next()
}

module.exports = auth