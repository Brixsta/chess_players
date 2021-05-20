const $container = $('.container');
const $submitBtn = $('.submitBtn');
const $inputBar = $('.inputBar');
var glob;

console.log($container);

$( document ).ready(function() {
    $submitBtn.click(function(data){
        let searchResult = $inputBar.val();

        $.get(`http://localhost:4004/api/${searchResult}`, (data) => {
                var results = data;
                glob = results;
                console.log(glob);    
        });

        
        createProfile();
    });
});

function createProfile () {
    var $canvas = $('<div></div>', {class:'canvas'});
    var $heading = $('<h3></h3>', {class:'heading'});
    $canvas.appendTo(document.body);
}