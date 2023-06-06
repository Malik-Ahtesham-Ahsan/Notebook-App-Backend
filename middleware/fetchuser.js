const jwt = require("jsonwebtoken")
const JWT_SECRET = 'maikisagoodboy'
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ err: "error ha bhiya" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(500).send("some error occuredha bhai");

    }


}
module.exports = fetchuser;