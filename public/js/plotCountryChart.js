class plotCountryChart{
    constructor(){

    }
    buildChart(data,query){

        return new Promise((resolve,reject)=>{
            let inurl ="";
            let result = {};
            if(data.text.trim() != ""){
                inurl =
                "http://3.15.172.27:8984/solr/" +
                "IRF19P4" +
                "/select?q=" +
                query +
                "&defType=edismax&qf=tweet_text&facet=on&facet.field=country&rows=0" + ((data.country!=null) ? '&fq=country:' + data.country : '') + ((data.lang!=null) ? '&fq=lang:'+ data.lang : ' ');
              }else{
                  resolve(false);
              }
              console.log(inurl);
              return fetch(inurl, {
                mode: "cors"
              })
                .then(res => res.json())
                .then(resp => {
                  for (const [i, value] of resp.facet_counts.facet_fields.country.entries()) {
                    console.log('%d: %s', i, value);
                    if( (typeof value) == "string" &&( value.toLowerCase() == "usa" || value.toLowerCase() == "india" || value.toLowerCase() == "brazil")){
                       result[value.toLowerCase()] = resp.facet_counts.facet_fields.country[i+1];
                    }
                }
                this.plotChart(result);
                resolve(true);
              });
        })
    }

    plotChart(data){
        Highcharts.chart("country_chart_query", {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie"
            },
            title: {
              text: "Country"
            },
            tooltip: {
              pointFormat: "<b>{point.percentage:.1f}%</b>"
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                  enabled: true,
                  format: "<b>{point.name}</b>: {point.y}"
                }
              }
            },
            series: [
              {
                name: "Tweet Count",
                colorByPoint: true,
                data: [
                  {
                    name: "USA",
                    y: data["usa"]
                  },
                  {
                    name: "India",
                    y: data["india"]
                  },
                  {
                    name: "Brazil",
                    y: data["brazil"]
                  }
                ]
              }
            ],
            exporting: { enabled: false }
          });
 
    }
}

Window.plotCountryChart = new plotCountryChart();