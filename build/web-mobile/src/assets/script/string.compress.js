String.prototype.compress=function(r){"use strict";r=!0===r;var t,o,e,n={},h="",i=[],s="",f=256;for(t=0;t<256;t+=1)n[String.fromCharCode(t)]=t;for(t=0;t<this.length;t+=1)e=h+(o=this.charAt(t)),n.hasOwnProperty(e)?h=e:(i.push(n[h]),s+=String.fromCharCode(n[h]),n[e]=f++,h=String(o));return""!==h&&(i.push(n[h]),s+=String.fromCharCode(n[h])),r?i:s},String.prototype.decompress=function(){"use strict";var r,t,o,e,n=[],h=[],i=this,s="",f=256;for(r=0;r<256;r+=1)h[r]=String.fromCharCode(r);if(i&&"string"==typeof i){for(r=0;r<i.length;r+=1)n.push(i[r].charCodeAt(0));i=n,n=null}for(o=t=String.fromCharCode(i[0]),r=1;r<i.length;r+=1){if(h[e=i[r]])s=h[e];else{if(e!==f)return null;s=t+t.charAt(0)}o+=s,h[f++]=t+s.charAt(0),t=s}return o};