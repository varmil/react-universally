import passport from 'passport'
import { Strategy } from 'passport-local'

passport.use(new Strategy(
  (username, password, done) => {
    console.log('##### Lets Auth ######', username, password)

    if (username !== 'foodbook') {
      return done(null, false, { message: 'Incorrect username.' })
    }

    if (password !== 'foodbook') {
      return done(null, false, { message: 'Incorrect password.' })
    }

    const user = { id: 777, username, password }

    return done(null, user)
  }
))



passport.serializeUser((user, done) => {
  console.log('#### serializeUser #####', user)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('#### deserializeUser ####', id)
  const user = { id: 888, foo: 'bar' }
  done(null, user)

  // User.findById(id, function(err, user) {
  //   done(err, user)
  // })
})
