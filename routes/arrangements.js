const router = require('express').Router();
const arrangements = require('../models/arrangements.model');
const sets = require('../models/cardSet.model');

router.route('/:id').get((req, res) => {
    // Taking in logged in user id as a parameter
    // Return back cards that are not deleted and createdBy logged in user OR cards that are not deleted and are public
    arrangements.find({ createdBy: req.params.id })
        .then(cards => res.send({allCards: cards}))
        .catch(err => res.status(400).json('[GET] | /cards/ | Error: ' + err));
});


router.route('/get/:id').get((req, res) => {
    console.log(req.params.id);
    // Taking in logged in user id as a parameter
    // Return back cards that are not deleted and createdBy logged in user OR cards that are not deleted and are public
    arrangements.find({ _id: req.params.id })
        .then(config => {
            console.log(config[0].cardSet);
            if(config[0].cardSet == "") {
                console.log("failed")
                res.send({set: null,config})
            } else {
                console.log("succ")
                console.log(config[0].cardSet);
                sets.find({ _id: config[0].cardSet })
                .then(set => {
                    console.log("found");
                    res.send({
                        set,config
                    })
                })
                .catch(err=>console.log("not found"))
            }
        })
        .catch(err => res.status(400).json('[GET] | /cards/ | Error: ' + err));
});

router.route('/add').post((req, res) => {

    let arrangement = req.body.arrangement;
    console.log(arrangement);
    let card = new arrangements({ 
        ...arrangement
    })
    card.save()
        .then((updated) => res.json({updated}))
        .catch(err => console.log(err));
});

router.route('/template/:id').get((req, res) => {
    // Taking in logged in user id as a parameter
    // Return back cards that are not deleted and createdBy logged in user OR cards that are not deleted and are public
    arrangements.find({ $or: [ { _id: req.body.id } ] })
        .then(card => res.send({...card}))
        .catch(err => res.status(400).json('[GET] | /cards/ | Error: ' + err));
});

/*
 * Old hard delete route
 */
// router.route('/:id').delete((req, res) => {
//     Card.findByIdAndDelete(req.params.id)
//         .then(() => res.json('[DELETE] | /cards/:id | Card successfully deleted!'))
//         .catch(err => res.status(400).json('[DELETE] | /cards/:id | Error: ' + err));
// });

router.route('/update/:id').post((req, res) => {
    console.log({...req.body.config, _id: req.body.id});
    arrangements.findByIdAndUpdate({_id: req.body.id},{...req.body.config, _id: req.body.id}, function(err, result){
        console.log(err, result);
        if(err){
            res.json('[POST] | /cards/update/:id | Card successfully updated!')
        }
        else{
            res.json('[POST] | /cards/update/:id | Saving Error: ' + err)
        }
    })
});

router.route('/find/:search').post((req, res) => {
    arrangements.find({...req.body.search})
        .then(cards => res.send({cards}))
        .catch(err => res.json('[POST] | /cards/update/:id | Error: ' + err));
});

router.route('/delete/:id').post((req, res) => {
    arrangements.deleteOne({_id: req.body.id})
        .then(() => res.json('[POST] | /cards/delete/:id | Card successfully updated!'))
        .catch(err => console.log(err));
});

module.exports = router;
