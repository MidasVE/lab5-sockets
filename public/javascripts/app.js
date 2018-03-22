var url = '/'
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity
        , min: 500
        , retries: 10
    }
});
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
    p1.innerHTML = i/(i+j)*100 + '%';

    var p2 = document.querySelector('.p--2')
    p2.innerHTML = j/(i+j)*100 + '%';
})

document.querySelector('.answer__link--1').addEventListener('click', function (e) {
    e.preventDefault();
    primus.write({action: 'click1'})
})
document.querySelector('.answer__link--2').addEventListener('click', function (e) {
    e.preventDefault();
    primus.write({action: 'click2'})
})
