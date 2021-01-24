/* eslint-disable default-case */
const Post = require('../models/post')
const slugify = require('slugify')

exports.create = (req, res) => {
//     console.log(req.body)
    const {title, content, user} = req.body
    const slug = slugify(title)
    //validate
    switch (true) {
        case !title:
            return res.status(400).json({ error: 'Title is required'})
            // eslint-disable-next-line no-unreachable
            break
        case !content:
            return res.status(400).json({ error: 'Content is required'})
            // eslint-disable-next-line no-unreachable
            break
    }
    //create post
  Post.create({title, content, user, slug}, (err, post)=> {
      if(err) {
          console.log(err)
          res.status(400).json({error: 'Duplicate post. Try another title'})
      }
      res.json(post)
  })
}



exports.show = (req, res) => {
    Post.find({})
    .limit(10) //lets you limit how many posts to get
    .sort({createdAt: -1}) //sorts by the latests created at top
    .exec((err, posts) => {
       
        if(err) console.log(err)
            res.json(posts)
    })

}

exports.read = (req, res) => {
    const {slug} =req.params
    //console.log{req.params.slug}
    Post.findOne({slug}).exec((err, post) => {
       
        if(err) console.log(err)
            res.json(post)
    })

}

exports.update = (req, res) => {
    const {slug} = req.params
    const {title, content, user} = req.body
    Post.findOneAndUpdate({slug}, {title, content, user}, {new: true}).exec((err, post) => {
        if (err) console.log(err)
        res.json(post)
    })
}

exports.remove = (req, res) => {
    const {slug} = req.params
    //console.log{req.params.slug}
    Post.findOneAndRemove({slug}).exec((err, post) => {
       
        if(err) console.log(err)
            res.json({
                message: 'Post Deleted'
            })
    })

}