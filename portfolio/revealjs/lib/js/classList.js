/*! majodev.github.io - v0.9.0 - build 2014-10-01 14:57:43 */
"undefined"==typeof document||"classList"in document.createElement("a")||!function(a){var b="classList",c="prototype",d=(a.HTMLElement||a.Element)[c],e=Object,f=String[c].trim||function(){return this.replace(/^\s+|\s+$/g,"")},g=Array[c].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},h=function(a,b){this.name=a,this.code=DOMException[a],this.message=b},i=function(a,b){if(""===b)throw new h("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new h("INVALID_CHARACTER_ERR","String contains an invalid character");return g.call(a,b)},j=function(a){for(var b=f.call(a.className),c=b?b.split(/\s+/):[],d=0,e=c.length;e>d;d++)this.push(c[d]);this._updateClassName=function(){a.className=this.toString()}},k=j[c]=[],l=function(){return new j(this)};if(h[c]=Error[c],k.item=function(a){return this[a]||null},k.contains=function(a){return a+="",-1!==i(this,a)},k.add=function(a){a+="",-1===i(this,a)&&(this.push(a),this._updateClassName())},k.remove=function(a){a+="";var b=i(this,a);-1!==b&&(this.splice(b,1),this._updateClassName())},k.toggle=function(a){a+="",-1===i(this,a)?this.add(a):this.remove(a)},k.toString=function(){return this.join(" ")},e.defineProperty){var m={get:l,enumerable:!0,configurable:!0};try{e.defineProperty(d,b,m)}catch(n){-2146823252===n.number&&(m.enumerable=!1,e.defineProperty(d,b,m))}}else e[c].__defineGetter__&&d.__defineGetter__(b,l)}(self);