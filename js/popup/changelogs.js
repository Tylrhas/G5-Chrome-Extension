export function changelogs() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var splitURL = tabs[0].url.split('/');
      var changelogsURL = 'https://' + splitURL[2] + '/api/websites/' + splitURL[4] + '/changelogs';
      console.log(changelogsURL);
      chrome.tabs.create({ url: changelogsURL });
    });
  }