class plotLanguageChart{
    constructor(){

    }
    buildChart(data,query){

        return new Promise((resolve,reject)=>{
            let inurl ="";
            let result = {other:0};
            if(data.text.trim() != ""){
                inurl =
                "http://3.15.172.27:8984/solr/" +
                "IRF19P4" +
                "/select?q=" +
                query +
                "&defType=edismax&qf=tweet_text&facet=on&facet.field=tweet_lang&rows=0" + ((data.country!=null) ? '&fq=country:' + data.country : '') + ((data.lang!=null) ? '&fq=lang:'+ data.lang : ' ');
              }else{
                  resolve(false);
              }
              //console.log(inurl);
              return fetch(inurl, {
                mode: "cors"
              })
                .then(res => res.json())
                .then(resp => {
                  for (const [i, value] of resp.facet_counts.facet_fields.tweet_lang.entries()) {
                    //console.log('%d: %s', i, value);
                    if( (typeof value) == "string" &&( value.toLowerCase() == "en" || value.toLowerCase() == "hi" || value.toLowerCase() == "pt")){
                       result[value.toLowerCase()] = resp.facet_counts.facet_fields.tweet_lang[i+1];
                    }else if((typeof value) == "string" &&( value.toLowerCase() != "en" || value.toLowerCase() != "hi" || value.toLowerCase() != "pt")){
                        result["other"] += resp.facet_counts.facet_fields.tweet_lang[i+1];
                    }
                }
                this.plotChart(result);
                resolve(true);
              });
        })
    }

    plotChart(data){
        Highcharts.chart("language_chart_query", {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie"
            },
            title: {
              text: "Language"
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
                    name: "English",
                    y: data["en"]
                  },
                  {
                    name: "Hindi",
                    y: data["hi"]
                  },
                  {
                    name: "Portuguese",
                    y: data["pt"]
                  },
                  {
                    name: "Others",
                    y: data["other"]
                  }
                ]
              }
            ],
            exporting: { enabled: false }
          });
 
    }
}

Window.plotLanguageChart = new plotLanguageChart();