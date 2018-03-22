function createPoll(req, res) {
    var a1 = req.body.input1;
    var a2 = req.body.input2;

    res.render('index', {language1 : a1, language2 : a2})
}

module.exports.createPoll = createPoll