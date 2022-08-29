const jwt = require('jwt-simple')
const unauthorazed = new Error('saia daqui')
unauthorazed.status = 401

const controller = {
  auth: (req, res, done) => {
    const token = req.query.token || req.headers.authorization
  
  
    if (!token) throw unauthorazed
    console.log('primeira')
  
  
    try {
      const decoded = jwt.decode(token, 'senha secreta')
      const isExpired = ( new Date(decoded.exp)).getTime() < (new Date()).getTime()
  
      if (isExpired) throw unauthorazed
      console.log('segunda')
  
      done()
    } catch (error) {
      console.log('terceira')
      throw unauthorazed
    }
    
  },

  login: (req,res) => {
    const { username, password} = req.body //destructuring
    // const username = req.body.username
    // const password = req.body.password
  
    if (username === 'novatec' && password === '123') {
      const today = new Date()
      today.setMinutes(today.getMinutes() + 5)

      const token = jwt.encode({
        user: username,
        exp: today
      }, 'senha secreta')
      return res.send({token})
    }
  
    throw unauthorazed
  }
}

module.exports = controller