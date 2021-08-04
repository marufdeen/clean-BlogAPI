const bcrypt = require('bcryptjs')

let password = {}

password.hashPassword = (password) => {
    let hashedPassword = bcrypt.hashSync(password, 10)
    return hashedPassword;
}

password.comparePassword = async (passwordInputed, existingPassword) => {
    let compared = await bcrypt.compare(passwordInputed, existingPassword)
    if(!compared) throw new Error('Password is incorrect')
    return compared;
}

module.exports = password