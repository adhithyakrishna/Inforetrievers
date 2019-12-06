class sentimentAnalysis{
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
                "&defType=edismax&qf=tweet_text&facet.field=sentiment&facet=on&fl=sentiment&rows=0" + ((data.country!=null) ? '&fq=country:' + data.country : '') + ((data.lang!=null) ? '&fq=lang:'+ data.lang : ' ');
              }else{
                  resolve(false);
              }
              console.log(inurl);
              return fetch(inurl, {
                mode: "cors"
              })
                .then(res => res.json())
                .then(resp => {
                  for (const [i, value] of resp.facet_counts.facet_fields.sentiment.entries()) {
                    console.log('%d: %s', i, value);
                    if( (typeof value) == "string"){
                       result[value.toLowerCase()] = resp.facet_counts.facet_fields.sentiment[i+1];
                    }
                }
                this.plotChart(result);
                resolve(true);
              });
        })
    }

    plotChart(data){
        Highcharts.chart("sentiment_chart_query", {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie"
            },
            title: {
              text: "Sentiment Analysis"
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
                name: "Sentiment",
                colorByPoint: true,
                data: [
                  {
                    name: "Positive",
                    y: data["positive"]
                  },
                  {
                    name: "Neutral",
                    y: data["neutral"]
                  },
                  {
                    name: "Negative",
                    y: data["negative"]
                  }
                ]
              }
            ],
            exporting: { enabled: false }
          });
 
    }
}

Window.sentimentAnalysis = new sentimentAnalysis();