//Isometry -- Graph Theory Project
// util.js -- Miscellaneous prototype patching

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}