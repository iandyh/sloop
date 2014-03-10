Array.prototype.remove = function(x) {
    var index = this.indexOf(x);
    if (index > -1) {
        this.splice(index, 1);
    }
}
