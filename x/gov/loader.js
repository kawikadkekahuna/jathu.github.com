// Function to check if the browser is IE
// Source: https://gist.github.com/paulirish/357741
function isIE(e,t){var n="IE",r=document.createElement("B"),i=document.documentElement,s;if(e){n+=" "+e;if(t){n=t+" "+n}}r.innerHTML="<!--[if "+n+']><b id="iecctest"></b><![endif]-->';i.appendChild(r);s=!!document.getElementById("iecctest");i.removeChild(r);return s}

function loadCSS(url, media) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.media = media || 'screen';
  link.href = url;
  document.getElementsByTagName('head')[0].appendChild(link);
}

function loadDV(originalDV) {
  if(!!originalDV.url && !!originalDV.option) {
    DV.load(originalDV.url, originalDV.option);
  }
}

(function() {
  // If the viewer is already loaded, don't repeat the process.
  if (window.DV && window.DV.loaded) return;

  window.DV = window.DV || {};
  window.DV.recordHit = "//www.documentcloud.org/pixel.gif";

  /*
    Previous document summary pages use DV.load before the
    viewer is finished loading... ridiculous. So, we save
    the original url and option then call it after viewer
    is finished loading.
  */
  var originalDV = window.DV.loadOriginalDocSummaryDV || {};
  DV.load = function(url, option) {
    originalDV.url = url;
    originalDV.option = option;
  }

  // Request the viewer JavaScript.
  var viewerjs = document.createElement('script');
  viewerjs.src = "//docs.ontario.ca/viewer/viewer.js";
  viewerjs.type = "text/javascript";
  var viewerjs_state = viewerjs.readyState;
  if(viewerjs_state) {
    viewerjs.onreadystatechange = function() {
      if(viewerjs_state == 'loaded' || viewerjs_state == 'complete') {
        viewerjs.onreadystatechange = null;
        loadDV(originalDV);
      }
    }
  } else {
    viewerjs.onload = function() {
      loadDV(originalDV);
    }
  }
  document.getElementsByTagName('head')[0].appendChild(viewerjs);

  if(isIE(8,'lte')) {
    loadCSS('//docs.ontario.ca/viewer/viewer-datauri-ie8.css');
  } else {
    loadCSS('//docs.ontario.ca/viewer/viewer-datauri.css');
  }
  loadCSS('//docs.ontario.ca/viewer/printviewer.css', 'print');

  // Record the fact that the viewer is loaded.
  DV.loaded = true;
})();