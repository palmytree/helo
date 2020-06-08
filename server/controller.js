const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db'),
      { username, password } = req.body,
      existingUser = (await db.get_user(username))[0],
      salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt)

    if (existingUser) return res.status(409).send('User exists')

    const newUser = (await db.create_user(username, hash))[0]

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const db = req.app.get('db'),
      { username, password } = req.body,
      existingUser = (await db.get_user(username))[0]

    if (!existingUser) return res.status(404).send('User does not exist')

    const authenticated = bcrypt.compareSync(password, existingUser.password)

    if (!authenticated)
      return res.status(403).send('Username or password wrong')

    delete existingUser.password

    req.session.user = existingUser

    res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(404)
    }
  },
  getPosts: async (req, res) => {
    const db = req.app.get('db'),
      { userposts, search } = req.query
    let posts
    if (!req.session.user) return res.sendStatus(404)
    const { id } = req.session.user

    if (userposts === 'true') {
      posts = await db.get_all_posts_withuser(search)
    } else {
      posts = await db.get_all_posts_nouser(search, id)
    }

    res.status(200).send(posts)
  },
  getPost: async (req, res) => {
    const db = req.app.get('db'),
      { postid } = req.params,
      post = (await db.get_post(postid))[0]

    res.status(200).send(post)
  },
  createPost: async (req, res) => {
    const db = req.app.get('db'),
      { id } = req.session.user,
      { title, content, img } = req.body,
      post = (await db.create_post(id, title, content, img))[0]

    if (post) res.sendStatus(200)
  },
  deletePost: async (req, res) => {
    const db = req.app.get('db'),
      { postid } = req.params,
      posts = await db.delete_post(postid)

    res.status(200).send(posts)
  },
  editPost: async (req, res) => {
    const db = req.app.get('db'),
      { title, img, content } = req.body,
      { postid } = req.params,
      post = (await db.edit_post(title, img, content, postid))[0]

    res.status(200).send(post)
  }
}
