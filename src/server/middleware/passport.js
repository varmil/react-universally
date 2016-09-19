import passport from 'passport'
import { Strategy } from 'passport-local'

passport.use(new Strategy(
  (username, password, done) => {
    console.log('##### Lets Auth ######', username, password)

    if (username !== 'fb') {
      return done(null, false, { message: 'Incorrect username.' })
    }

    if (password !== 'fb') {
      return done(null, false, { message: 'Incorrect password.' })
    }

    // 本当はDBなどから情報取得
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
