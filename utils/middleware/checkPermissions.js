const checkPermLvl = (requestedResourcePermLvl, error) => {
    return async (req, res, next) => {
        const user = await req.user
        if (user.permLevel < requestedResourcePermLvl){
            res.status(403).render('error.ejs', {
                reason: error,
                user: await req.user
            })
        } else {
            return next()
        }
    }
}

module.exports = checkPermLvl