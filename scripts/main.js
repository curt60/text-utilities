var i;

var print = function () {
    console.log(i);
};


for (i = 0; i < 10; i++) {
    (function () {
        setTimeout(print, 1000);
    })();
};

