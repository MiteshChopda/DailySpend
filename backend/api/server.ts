import App from './main.js'

const PORT = Number(process.env.PORT) || 3000

App.listen(PORT, () => {
  console.log(`Listening on localhost port ${PORT}`)
})

