var url = '/'
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity,
        min: 500,
        retries: 10
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
        primus.write({
            question: question
        });
        primus.write({
            answer1: a1
        });
        primus.write({
            answer2: a2
        });
    });
}

var p1 = 0;
var p2 = 0;

var i1 = 0;
var i2 = 0;

primus.on("data", function (data) {
    if (data.question) {
        var q = document.querySelector('.q');
        q.innerHTML = data.question;
    }

    if (data.answer1) {
        var a1 = document.querySelector('.answer__link--1 p');
        a1.innerHTML = data.answer1;
    }

    if (data.answer2) {
        var a2 = document.querySelector('.answer__link--2 p');
        a2.innerHTML = data.answer2;
    }

    if (data.action) {
        if (data.action == 'click1') {
            i1++;
            p1 = i1 / (i1 + i2) * 100;
            p2 = i2 / (i1 + i2) * 100;
            primus.write({
                p1: p1
            });
            primus.write({
                p2: p2
            });
        } else if (data.action == 'click2') {
            i2++;
            p1 = i1 / (i1 + i2) * 100;
            p2 = i2 / (i1 + i2) * 100;
            primus.write({
                p1: p1
            });
            primus.write({
                p2: p2
            });
        }
    }
    if (data.p1) {
        var htmlp1 = document.querySelector('.p--1');
        htmlp1.innerHTML = data.p1;
    }
    if (data.p2) {
        var htmlp2 = document.querySelector('.p--2');
        htmlp2.innerHTML = data.p2;
    }
})

var answerLink1 = document.querySelector('.answer__link--1');
if (answerLink1) {
    answerLink1.addEventListener('click', function (e) {
        e.preventDefault();
        primus.write({
            action: 'click1'
        })
    })
}
var answerLink2 = document.querySelector('.answer__link--2');
if (answerLink2) {
    answerLink2.addEventListener('click', function (e) {
        e.preventDefault();
        primus.write({
            action: 'click2'
        })
    })
}
