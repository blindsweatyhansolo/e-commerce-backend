const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags, including associated Product
  try {
    const tags = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tags);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findOne({
      // find single tag by its primary key (id)
      where: {
        id: req.params.id
      },
      // include associated product(s)
      include: [Product]
    });

    // if no id match, return error
    if (!tag) {
      res.status(404).json({ message: 'No tag found with matching id!' });
      return;
    }

    res.status(200).json(tag);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error. Please check formatting!'});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })

    // if no id match, return error
    if (!updatedTag) {
      res.status(404).json({ message: 'No category found with matching id!'});
      return;
    }

    res.status(200).json({message: 'Tag updated!'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    // if no id match, return error
    if (!tag) {
      res.status(404).json({ message: 'No tag found with matching id!' });
      return;
    }

    res.status(200).json({message: 'Tag deleted!'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error'});
  }
});

module.exports = router;
