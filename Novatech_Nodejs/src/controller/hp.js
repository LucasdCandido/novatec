const ENDPOINT = 'http://hp-api.herokuapp.com/api/characters'
const axios = require('axios')


const controller = {
  async list(req,res) {
    const result = await axios.get(ENDPOINT)
    const data = result.data.map(item => {
      return {
        name:item.name,
        gender: item.gender
      }
    })
    res.send(data)
  }
    // return axios.get(ENDPOINT)
    //   .then(result => {
    //     const data = result.data.map(item => {
    //       return {
    //         name: item.name,
    //         gender: item.gender
    //       }
    //     })
    //     res.send(data)
    //   })
}

module.exports = controller