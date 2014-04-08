var handle_submit = function() {
    var
    input_eles = document.getElementsByTagName('input'),
    to_currencies = [];

    for (var i=0; i < input_eles.length; i++) {
        var node = input_eles[i];
        if (node.getAttribute('type') === 'checkbox') {
            if (node.checked) to_currencies.push(node.value);
        }
    };
    localStorage['converter'] = to_currencies;
    window.close();
}

var render_options = function() {
    var data = localStorage['converter'],
        selected = data && data.split(',');
    if (!selected) return false;
    selected.forEach(function(currency){
        var node = document.getElementsByName(currency.toLowerCase())[0];
        node.checked = true;
    })
}
document.addEventListener('DOMContentLoaded', function () {
    render_options();
    document.querySelector('#submit-btn').addEventListener('click', handle_submit);
});
