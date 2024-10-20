const jwt = require("jsonwebtoken")

const tokenSign = async (id) => {
    // console.log(id, "idtokenSign")
    const sign = jwt.sign(
        {
            _id: id,
        },
        
        process.env.JWT_SECRET,
        
        {
            expiresIn: "2h"
        }
    )
    // console.log(sign)
    return sign
}

const verifyToken = async (tokenJwt) => {
    try {
        // console.log(tokenJwt)
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }