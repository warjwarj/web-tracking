const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialise(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user == null){
            return done(null, false, { message: 'user is null, check spelling' })
        } 
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'incorrect password' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use( new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        console.log(getUserById(id))
        return done(null, getUserById(id))
    })
}


module.exports = initialise



