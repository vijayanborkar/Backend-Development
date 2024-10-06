<<<<<<< HEAD
let express = require('express');
let { post } = require('./models/post.model');
let { sequelize } = require('./lib/index');

let app = express();

let posts = [
  {
    id: 1,
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1',
  },
  {
    id: 2,
    name: 'Post2',
    author: 'Author2',
    content: 'This is the content of post 2',
    title: 'Title2',
  },
  {
    id: 3,
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.status(200).json({ message: 'Database Seeding Successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

// Exercise 1: Fetch all posts
async function fetchAllPosts() {
  let posts = await post.findAll();
  return { posts };
}

app.get('/posts', async (req, res) => {
  try {
    let result = await fetchAllPosts();
    if (result.posts.length === 0) {
      return res.status(404).json({ message: 'Posts Not Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch post details by ID
async function fetchPostDetailsById(id) {
  let posts = await post.findOne({ where: { id } });
  return { posts: posts };
}

app.get('/posts/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchPostDetailsById(id);
    if (result.posts.length === 0) {
      res.status(404).json({ message: 'No Id for Posts Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all posts by an author
async function fetchAllPostsByAuthor(author) {
  let posts = await post.findAll({ where: { author } });
  return { posts: posts };
}

app.get('/posts/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let result = await fetchAllPostsByAuthor(author);
    if (result.posts.result === 0) {
      res.status(404).json({ message: 'No Author for Posts Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the posts by their name
async function sordAllThePostsByName(order) {
  let posts = await post.findAll({ order: [['name', order]] });
  return { posts: posts };
}

app.get('/posts/sort/name', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sordAllThePostsByName(order);
    if (result.posts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tracks by release_year found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
=======
let express = require('express');
let { post } = require('./models/post.model');
let { sequelize } = require('./lib/index');

let app = express();

let posts = [
  {
    id: 1,
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1',
  },
  {
    id: 2,
    name: 'Post2',
    author: 'Author2',
    content: 'This is the content of post 2',
    title: 'Title2',
  },
  {
    id: 3,
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.status(200).json({ message: 'Database Seeding Successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

// Exercise 1: Fetch all posts
async function fetchAllPosts() {
  let posts = await post.findAll();
  return { posts };
}

app.get('/posts', async (req, res) => {
  try {
    let result = await fetchAllPosts();
    if (result.posts.length === 0) {
      return res.status(404).json({ message: 'Posts Not Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch post details by ID
async function fetchPostDetailsById(id) {
  let posts = await post.findOne({ where: { id } });
  return { posts: posts };
}

app.get('/posts/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchPostDetailsById(id);
    if (result.posts.length === 0) {
      res.status(404).json({ message: 'No Id for Posts Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all posts by an author
async function fetchAllPostsByAuthor(author) {
  let posts = await post.findAll({ where: { author } });
  return { posts: posts };
}

app.get('/posts/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let result = await fetchAllPostsByAuthor(author);
    if (result.posts.result === 0) {
      res.status(404).json({ message: 'No Author for Posts Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the posts by their name
async function sordAllThePostsByName(order) {
  let posts = await post.findAll({ order: [['name', order]] });
  return { posts: posts };
}

app.get('/posts/sort/name', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sordAllThePostsByName(order);
    if (result.posts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tracks by release_year found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
