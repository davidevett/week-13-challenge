const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // update the ProductTag associations as well
  Tag.findByPk(req.params.id)
   .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      return tag.update(req.body);
    })
   .then((updatedTag) => res.json(updatedTag))
   .catch((err) => res.status(400).json(err));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  // delete the ProductTag associations as well
  Tag.findByPk(req.params.id)
   .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      return tag.destroy();
    })
   .then(() => res.json({ message: 'Tag deleted successfully' }))
   .catch((err) => res.status(400).json(err));
});

module.exports = router;
