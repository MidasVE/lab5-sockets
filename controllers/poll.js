function createPoll(req, res) {
    var q = req.body.input1;
    var a1 = req.body.input2;
    var a2 = req.body.input3;

    res.render('index', {question: q, language1 : a1, language2 : a2})
}

module.exports.createPoll = createPoll