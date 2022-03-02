export const welcome = (req, res) => {
  res.send({
    message: 'welcome to nodejs-api!',
    note: 'use postman to test me (follow the setup here: https://github.com/joaorfclopes/nodejs-api#readme)',
    requests: {
      users: {
        create: 'POST /users/create',
        findOne: 'GET /users/:id',
        findAll: 'GET /users',
        update: 'PUT /users/update/:id',
        delete: 'DELETE /users/delete/:id'
      },
      auth: {
        login: 'POST /auth/login',
        logout: 'POST /auth/logout/:id'
      }
    }
  })
}
