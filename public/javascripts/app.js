var url = '/'
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity
        , min: 500
        , retries: 10
    }
});
var btnCreatePoll = document.querySelector('.buttonCreatePoll');
if (btnCreatePoll) {
    btnCreatePoll.addEventListener('click', function (e) {
        e.preventDefault();
        var form = document.querySelector('.form');
        var question = form.elements[0].value;
        var a1 = form.elements[1].value;
        var a2 = form.elements[2].value;
        primus.write({question: question});
        primus.write({answer1: a1});
        primus.write({answer2: a2});
    });
}

var i = 0;
var j = 0;
primus.on('data', function (data) {
    console.log(data);
    answersPage = document.querySelector('.answers');
    if (answersPage) {
        var q = document.querySelector('.q');
        var a1 = document.querySelector('.answer__link--1 p');
        var a2 = document.querySelector('.answer__link--2 p');
        var p1 = document.querySelector('.p--1');
        var p2 = document.querySelector('.p--2');

        if (data.question !== undefined) {
            q.innerHTML = data.question;
        }

        if (data.answer1 !== undefined) {
            a1.innerHTML = data.answer1;
        }

        if (data.answer2 !== undefined) {
            a2.innerHTML = data.answer2;
        }

        if (data.action === "click1") {
            i++;
            var percentage1 = i / (i + j) * 100 + '%';
            primus.write({p: percentage1})
        } else if (data.action === "click2") {
            j++;
            var percentage2 = i / (i + j) * 100 + '%';
            primus.write({p: percentage2});
        }

    }
})
var answerLink1 = document.querySelector('.answer__link--1');
if (answerLink1) {
    answerLink1.addEventListener('click', function (e) {
        e.preventDefault();
        primus.write({action: 'click1'})
    })
}
var answerLink2 = document.querySelector('.answer__link--2');
if (answerLink2) {
    answerLink2.addEventListener('click', function (e) {
        e.preventDefault();
        primus.write({action: 'click2'})
    })
}
