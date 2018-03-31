var url = '/'
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity
        , min: 500
        , retries: 10
    }
});

document.querySelector('.buttonCreatePoll').addEventListener('click', function (e) {
    e.preventDefault();
    console.log('test')
})

var i = 0;
var j = 0;
primus.on('data', function (data) {
    console.log(data.action)
    if (data.action === "click1") {
        i++;
    } else {
        j++;
    }
    var p1 = document.querySelector('.p--1');
    var percentage1 = i / (i + j) * 100 + '%';
    primus.write({p: percentage1})

    var p2 = document.querySelector('.p--2')
    p2.innerHTML = j / (i + j) * 100 + '%';

    if (data.p) {
        console.log(data.p);
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
answerLink2.addEventListener('click', function (e) {
    e.preventDefault();
    primus.write({action: 'click2'})
})
