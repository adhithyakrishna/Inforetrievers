$(document).ready(function() {
  $(".queryBasedAnalysis").bind("click", function(event) {});

  $(".hash").bind('click', function(event) {
    var hashtageName = $(this).attr('name');
    $(".queryBasedAnalysis").trigger('click');
    let query = '{!term f%3Dmentions}' + hashtageName; 
    $("#analysisContainer").addClass("analysisContainer");
    $("#analysisContainer").removeClass("analysisContainerVisible");
    $(".noData").removeClass("noDataVisible");
    $(".loader").addClass("loaderPresent");
    $(".mapGraph").removeClass("mapGraphInvisible");
    Window.getData({text:hashtageName},query);
});

  $(".search").bind("click", function(event) {

    var lang = null;
    var country = null;
    var data = $('.radio:checkbox:checked');
    $.each(data, function(index, value){
        if(value.value == "en" ||value.value=="hi" || value.value=="pt")
        {
            lang = value.value;
        }
        if(value.value == "USA" ||value.value=="India" || value.value=="Brazil")
        {
            country = value.value;
        }
    });

    var searchText = $("#search-bar").val();
    $("#analysisContainer").addClass("analysisContainer");
    $("#analysisContainer").removeClass("analysisContainerVisible");
    $(".noData").removeClass("noDataVisible");
    $(".loader").addClass("loaderPresent");
    $(".mapGraph").removeClass("mapGraphInvisible");
    // $("#queryBasedSubGraphContainer").addClass("queryBasedSubGraphContainerVisible");
    Window.QuerySolr.getLanguageTranslationResults(searchText).then(data => {  
      data.lang = lang;
      data.country = country;
      switch(lang){
        case null:
          query = Window.QuerySolr.buildQuery(data);
          Window.getData(data,query);
          break;
        case 'en':
          if(lang == data.srcLang){
            query = Window.QuerySolr.buildQuery(data,'en');
            Window.getData(data,query);
          }else{
            query = Window.QuerySolr.buildQuery(data,'en',true);
            Window.getData(data,query);
          }
          break;
        case 'pt':
            if(lang == data.srcLang){
              query = Window.QuerySolr.buildQuery(data,'pt');
              Window.getData(data,query);
            }else{
              query = Window.QuerySolr.buildQuery(data,'pt',true);
              Window.getData(data,query);
            }
            break;
        case 'hi':
            if(lang == data.srcLang){
              query = Window.QuerySolr.buildQuery(data,'hi');
              Window.getData(data,query);
            }else{
              query = Window.QuerySolr.buildQuery(data,'hi',true);
              Window.getData(data,query);
            }
            break;
      }
    });
  });

  Window.getData = getData = (data,query) => {
      // country count on facet search
      p1 = Window.plotCountryChart.buildChart(data, query);
      p2 = Window.plotLanguageChart.buildChart(data, query);
      p3 = Window.plotTimelineChart.buildChart(data, query);
      p4 = Window.sentimentAnalysis.buildChart(data, query);
      p5 = Window.GoogleMap.getLocationsOnSolrOnQuery(data, query);
      Promise.all([p1, p2, p3, p4, p5]).then(results => {
          let val = true;
          for(let index in results){
            val = val && results[index];
          }
          $(".loader").removeClass("loaderPresent");
          if(val){
            $("#analysisContainer").addClass("analysisContainer");
            $("#analysisContainer").addClass("analysisContainerVisible");
          }else{
            $("#analysisContainer").removeClass("analysisContainer");
            $(".mapGraph").addClass("mapGraphInvisible");
            $(".noData").addClass("noDataVisible");
            // $("#queryBasedSubGraphContainer").removeClass("queryBasedSubGraphContainerVisible");
          }
      });
  }
});
