const checkPermLvl = (requestedResourcePermLvl) => {
    return async (req, res, next) => {
        const user = await req.user
        if (user.permLevel < requestedResourcePermLvl){
            res.status(403).render('error.ejs', {
                reason: "you do not have a high enough permission level to view the requested page. Please contact support if this is unexpected"
            })
        } else {
            return next()
        }
    }
}

module.exports = checkPermLvl