$(document).ready(function() {
  class DrawAllCharts {
    constructor() {}

    drawCountryChart() {
      Highcharts.chart("country_chart", {
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
                y: 30609
              },
              {
                name: "India",
                y: 20606
              },
              {
                name: "Brazil",
                y: 29081
              }
            ]
          }
        ],
        exporting: { enabled: false }
      });
    }

    drawLanguageChart() {
      Highcharts.chart("language_chart", {
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
                y: 42819
              },
              {
                name: "Portugese",
                y: 23344
              },
              {
                name: "Hindi",
                y: 11595
              },
              {
                name: "Other",
                y: 2538
              }
            ]
          }
        ],
        exporting: { enabled: false }
      });
    }

    drawSentimentChart() {
      Highcharts.chart("sentiment_chart", {
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
                y: 16414
              },
              {
                name: "Neutral",
                y: 55810
              },
              {
                name: "Negative",
                y: 8072
              }
            ]
          }
        ],
        exporting: { enabled: false }
      });
    }

    findDateItemPresence(dataObj, dateObj) {
      console.log("checking dataItem presence");
      let result = dataObj.data.find(
        dateitem =>
          new Date(dateitem[0]).getDay() == dateObj.getDay() &&
          new Date(dateitem[0]).getMonth() == dateObj.getMonth() &&
          new Date(dateitem[0]).getFullYear() == dateObj.getFullYear()
      );
      return result;
    }

    drawTimelineChart() {
      Highcharts.chart("timeline_chart", {
        chart: {
          type: "spline"
        },
        title: {
          text: "Snow depth at Vikjafjellet, Norway"
        },
        subtitle: {
          text: "Irregular time data in Highcharts JS"
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
            text: "Snow depth (m)"
          },
          min: 0
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
        },

        plotOptions: {
          series: {
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
      });
    }

    staticChart() {
      this.drawCountryChart();
      this.drawLanguageChart();
      this.drawSentimentChart();
      //   this.drawTimelineChart();
      //   this.plotTimelineChart();
    }
  }

  Window.DrawAllCharts = new DrawAllCharts();

  class CustomTranslator {
    _googleApiKey = "AIzaSyB5QUXpymXW15M8Rc78Ke0PLCUddaVFvcI";

    get googleApiKey() {
      return this._googleApiKey;
    }

    constructor() {}
    getTranslatedTextInternal(text, language) {
      // console.log("getting translated Text");
      let data = {
        q: text,
        target: language,
        model: "base"
      };
      return fetch(
        "https://translation.googleapis.com/language/translate/v2?key=" +
          this.googleApiKey,
        {
          method: "POST",
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then(resp => {
          // console.log("Request complete! response: ", resp);
          // console.log("Translated Text: ", resp.data.translations[0].translatedText)
          return {
            text: resp.data.translations[0].translatedText,
            srcLang: resp.data.translations[0].detectedSourceLanguage
          };
        });
    }

    getTranslatedText(text, language) {
      return this.getTranslatedTextInternal(text, language).then(res => {
        // console.log("Returned Translated Text: ", res);
        return res;
      });
    }
  }

  Window.CustomTranslator = new CustomTranslator();

  class QuerySolr {
    constructor() {}

    getLanguageTranslationResults(text, facetFields) {
      let englishText = "";
      let hindiText = "";
      let portugueseText = "";
      text = text.toLowerCase();
      return new Promise((resolve, reject) => {
        Window.CustomTranslator.getTranslatedText(text, "en").then(res => {
          englishText = "(" + encodeURIComponent(res.text) + ")";
          // console.log(englishText);
          // console.log(encodeURIComponent(res.text));
          Window.CustomTranslator.getTranslatedText(text, "hi").then(res => {
            hindiText = "(" + encodeURIComponent(res.text) + ")";
            // console.log(hindiText);
            Window.CustomTranslator.getTranslatedText(text, "pt").then(res => {
              portugueseText = "(" + encodeURIComponent(res.text) + ")";
              // console.log(portugueseText);
              resolve({
                text: encodeURIComponent(text),
                englishText: englishText,
                hindiText: hindiText,
                portugueseText: portugueseText,
                srcLang: res.srcLang
              });
            });
          });
        });
      });
    }

    buildQuery(data, selectedLanguage, notMatchingDetection) {
      let query = "";
      if (selectedLanguage == null) {
        let boostFactorEn = 1.0;
        let boostFactorHi = 1.0;
        let boostFactorPt = 1.0;
        switch (data.srcLang) {
          case "en": {
            boostFactorEn = 5.0;
            break;
          }
          case "hi": {
            boostFactorHi = 5.0;
            break;
          }
          case "pt": {
            boostFactorPt = 5.0;
            break;
          }
          default: {
            boostFactorEn = 0.5;
            boostFactorHi = 0.5;
            boostFactorPt = 0.5;
            break;
          }
        }
        // let query = "text:" + englishText + "^" + boostFactorEn + "+text:" + hindiText + "^" + boostFactorHi +
        // "+text:" + portugueseText + "^" + boostFactorPt;
        if (data.srcLang == "it") {
          query =
            data.text +
            "^" +
            5 +
            " OR " +
            data.englishText +
            "^" +
            boostFactorEn +
            " OR " +
            data.hindiText +
            "^" +
            boostFactorHi +
            " OR " +
            data.portugueseText +
            "^" +
            boostFactorPt;
        } else {
          query =
            data.englishText +
            "^" +
            boostFactorEn +
            " OR " +
            data.hindiText +
            "^" +
            boostFactorHi +
            " OR " +
            data.portugueseText +
            "^" +
            boostFactorPt;
        }
      } else {
        switch (selectedLanguage) {
          case "en":
            if (notMatchingDetection) {
              query = "(" + data.text + ") OR "+ data.englishText;
            } else {
              query = "(" + data.text + ")";
            }
            break;
          case "hi":
            if (notMatchingDetection) {
              query = "(" + data.text + ") OR " + data.hindiText;
            } else {
              query = "(" + data.text + ")";
            }
            break;
          case "pt":
            if (notMatchingDetection) {
              query = "(" + data.text + ") OR " + data.portugueseText;
            } else {
              query = "(" + data.text + ")";
            }
            break;
        }
      }
      return query;
    }

    querySolr(
      defaultText,
      englishText,
      hindiText,
      portugueseText,
      srcLang,
      facetFields
    ) {
      query = this.buildQuery(
        defaultText,
        englishText,
        hindiText,
        portugueseText,
        srcLang,
        facetFields
      );
      if (facetFields) {
        query = "tweet_text:*";
        let inurl =
          "http://3.15.172.27:8984/solr/" +
          "IRF19P4" +
          "/select?q=" +
          query +
          "&facet=on&facet.field=country&fl=country,created_at&rows=90000";
        console.log(inurl);
        return fetch(inurl, {
          mode: "cors"
        })
          .then(res => res.json())
          .then(resp => {
            console.log(resp.response.docs);
            return resp.response.docs;
          });
      } else if (defaultText.trim() == "") {
        query = "tweet_text:*";
        let inurl =
          "http://3.15.172.27:8984/solr/" + "IRF19P4" + "/select?q=" + query;
        console.log(inurl);
        return fetch(inurl, {
          mode: "cors"
        })
          .then(res => res.json())
          .then(resp => {
            console.log(resp.response.docs);
            return resp.response.docs;
          });
      } else {
        let inurl =
          "http://3.15.172.27:8984/solr/" +
          "IRF19P4" +
          "/select?q=" +
          query +
          "&defType=edismax&qf=tweet_text";
        console.log(inurl);
        return fetch(inurl, {
          mode: "cors"
        })
          .then(res => res.json())
          .then(resp => {
            console.log(resp.response.docs);
            return resp.response.docs;
          });
      }
    }
  }

  Window.QuerySolr = new QuerySolr();

  $(".search")
    .unbind("click")
    .bind("click", function(event) {
      var data = $("#search-bar").val();
      Window.QuerySolr.getLanguageTranslationResults(data);
    });
});
