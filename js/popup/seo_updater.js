export function seo_updater() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/seo_updater.js" });
  });
}