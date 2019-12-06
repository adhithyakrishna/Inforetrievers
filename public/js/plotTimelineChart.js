class plotTimelineChart{
   modelObj = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Tweet Timeline Chart"
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        // don't display the dummy year
        month: "%e. %b",
        year: "%b"
      },
      title: {
        text: "Date"
      }
    },
    yAxis: {
      title: {
        text: "No. of Tweets"
      },
      min: 0
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "{point.x:%e. %b}: {point.y} tweets"
    },

    plotOptions: {
      series: {
        connectNulls: true,
        marker: {
          enabled: true
        }
      }
    },

    colors: ["#6CF", "#39F", "#06C", "#036", "#000"],

    // Define the data points. All series have a dummy year
    // of 1970/71 in order to be compared on the same x axis. Note
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    series: [
      {
        name: "USA",
        data: []
      },
      {
        name: "India",
        data: []
      },
      {
        name: "Brazil",
        data: []
      }
    ],
    exporting: { enabled: false },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            plotOptions: {
              series: {
                marker: {
                  radius: 2.5
                }
              }
            }
          }
        }
      ]
    }
  };  
buildChart(data,query) {
  return new Promise((resolve,reject)=>{
    let inurl ="";
    if(data.text.trim() != ""){
      inurl =
      "http://3.15.172.27:8984/solr/" +
      "IRF19P4" +
      "/select?q=" +
      query +
      "&defType=edismax&qf=tweet_text&fl=created_at,country&rows=90000" + ((data.country!=null) ? '&fq=country:' + data.country : '') + ((data.lang!=null) ? '&fq=lang:'+ data.lang : ' ');
      }else{
        resolve(false);
      }
      // console.log(inurl);
      return fetch(inurl, {
        mode: "cors"
      })
        .then(res => res.json())
        .then(resp => {
          let docs = resp.response.docs;
          this.populateModel(docs);
          resolve(true);
      });
})
}

findDateItemPresence(dataObj,dateObj){
  //console.log("checking dataItem presence")
  let result = dataObj.data.find(
      dateitem =>
      new Date(dateitem[0]).getDay()== dateObj.getDay() &&
      new Date(dateitem[0]).getMonth() == dateObj.getMonth() &&
      new Date(dateitem[0]).getFullYear() == dateObj.getFullYear()
    );
    return result;
}
populateModel(docs){
        let modelObj = new plotTimelineChart().modelObj;
        let usaObj = modelObj["series"][0];
        let indiaObj = modelObj["series"][1];
        let brazilObj = modelObj["series"][2];
        let results = [];
        for (var doc of docs) {
          let dateObj = new Date(doc["created_at"]);
          if(doc["created_at"]){
            //console.log(doc["created_at"]);
            //console.log(dateObj);
            let subModel = {
              day: 0,
              month: 0,
              year: 0,
              count: {
                USA: 0,
                Brazil: 0,
                India: 0
              }
            };
            let arr = new Array();
            arr.push(
              Date.UTC(
                dateObj.getFullYear(),
                dateObj.getMonth(),
                dateObj.getDay()
              ),
              1
            );
              switch (doc["country"][0]) {
                  case "USA": {
                        let result = this.findDateItemPresence(usaObj,dateObj);
                        if(result != null){
                           result[1] += 1
                        }else if(arr[0]!=null){
                            usaObj.data.push(arr);
                        }
                    break;
                  }
                  case "India": {
                      let result = this.findDateItemPresence(indiaObj,dateObj);
                      if(result){
                         result[1] += 1
                      }else if(arr[0]!=null){
                          indiaObj.data.push(arr);
                      }
                    break;
                  }
                  case "Brazil": {
                      let result = this.findDateItemPresence(brazilObj,dateObj);
                      if(result){
                         result[1] += 1
                      }else if(arr[0]!=null){
                          brazilObj.data.push(arr);
                      }
                    break;
                  }
                  default: {
                    break;
                  }
                }
            }
          }
          usaObj.data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b[0]) - new Date(a[0]);
          });

          indiaObj.data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b[0]) - new Date(a[0]);
          });

          brazilObj.data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b[0]) - new Date(a[0]);
          });

          Highcharts.chart("timeline_chart_query", modelObj);
      }
}

Window.plotTimelineChart = new plotTimelineChart();

