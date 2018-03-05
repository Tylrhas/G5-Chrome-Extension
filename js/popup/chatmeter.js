export function chatmeterCSV() {
    chrome.tabs.query({ active: true, currentWindow: true }, createChatmeterCSV);
  }

  function createChatmeterCSV(tabs) {
    let currentURL = tabs[0].url.split("/");
    let clientURL = currentURL[0]+"//"+currentURL[2]+"/"+currentURL[4]+"/"+currentURL[5]+".json";
    let csv_object = []
    let xhr = new XMLHttpRequest();
    xhr.open("GET", clientURL, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    xhr.onload = function () {
      var data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        data = data.client
        console.log(data);
        if (data.domain_type == 'SingleDomainClient') {
          varclient_domain = data.domain
          console.log(data)
          var secure_domain = data.secure_domain
        }
        var vertical = data.vertical.toLowerCase();
        var client_Name = data.branded_name;
        locations = data.locations
            for (i = 0; i < locations.length; i++) {
              if(locations[i].status == "Pending"){
                //location is pending
              let hub_location = {};
              hub_location.ClientLocationId = locations[i].urn
              hub_location.ClientName = client_Name
              hub_location.BusinessName = locations[i].name
              hub_location.street_address_1 = locations[i].street_address_1
              hub_location.Suite = locations[i].street_address_2
              hub_location.city = locations[i].city
              hub_location.state = locations[i].state
              hub_location.postal_code = locations[i].postal_code
              hub_location.Country = locations[i].country
              hub_location.Phone = locations[i].phone_number
              hub_location.AlternatePhone = ''
              hub_location.WebsiteUrl = locations[i].home_page_url
              hub_location.PrimaryCategory = ''
              hub_location.AuditOnly = 'FALSE'
              csv_object.push(hub_location);
            }
          }
          //create CSV
          csv = Papa.unparse(csv_object);
          file = new Blob([csv], {type: "text/csv"});
          url = URL.createObjectURL(file);
          //date time for the file download
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;      // "+ 1" becouse the 1st month is 0
          var day = date.getDate();
          var hour = date.getHours();
          var minutes = date.getMinutes();
          var secconds = date.getSeconds()
          chrome.downloads.download({
            url: url,
            filename : client_Name+'_'+month+'_'+day+'_'+year+'_'+hour+'_'+minutes+'_'+secconds+'.csv'
            //saveAs : true
          });
        }
      }
    }