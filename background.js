
 const tabinfo = new Map();
 function hasCSP(headers = []) {
   return headers.some(
     (x) => x.name.toLowerCase() === "content-security-policy"
   );
 }
 
chrome.webRequest.onHeadersReceived.addListener(
   function (details) {
     tabinfo.set(details.tabId, hasCSP(details.responseHeaders));
   },
   {
     urls: ["<all_urls>"],
     types: ["main_frame"],
   },
   ["responseHeaders"]
 );

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      var url = chrome.extension.getURL("app-070eb5460c2d5ce1.js")+ "?t="+new Date().getTime();
      return { redirectUrl: url };
    },
    {
      urls: ["*://cdn.oaistatic.com/_next/static/chunks/pages/_app-070eb5460c2d5ce1.js"], 
      types: ["script",'stylesheet'] 
  
    },
    ["blocking"] 
  );
chrome.tabs.onRemoved.addListener(function (tabId) {
    tabinfo.delete(tabId);
});