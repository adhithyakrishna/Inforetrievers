$(document).ready(function() {


	class CustomTranslatorSearch{

		_googleApiKey = "AIzaSyB5QUXpymXW15M8Rc78Ke0PLCUddaVFvcI";
	
		get googleApiKey() {
			return this._googleApiKey;
		}
	
		constructor(){
	
		}
		getTranslatedTextInternal(text,language){
			console.log("getting translated Text");
			let data = {
				"q": text,
				"target":language,
				"model": "base"
			 }
			return fetch("https://translation.googleapis.com/language/translate/v2?key="+this.googleApiKey, {
				method: "POST", 
				body: JSON.stringify(data)
			}).then(res => res.json()).then(resp=>{
				// console.log("Request complete! response: ", resp);
				// console.log("Translated Text: ", resp.data.translations[0].translatedText)
				return {text:resp.data.translations[0].translatedText,srcLang:resp.data.translations[0].detectedSourceLanguage}
			})
		}
	
		getTranslatedText(text,language){
			return this.getTranslatedTextInternal(text,language).then(res =>{
				console.log("Returned Translated Text: ", res)
				return res;
			});
		}
	}
	
	Window.CustomTranslatorSearch = new CustomTranslatorSearch();


class HashTagSearch {

    constructor()
    {

    }

    searchSolr(hashtageName, start, rows)
    {
        return new Promise((resolve,reject)=>{
            let inurl = 'http://3.15.172.27:8984/solr/IRF19P4/select?q={!term f%3Dmentions}' + hashtageName +'&rows='+rows+'&start='+start;
             fetch(inurl,{
                mode: "cors"
            }).then(res=>res.json()).then(resp=>{
                resolve(resp.response);
            });
        })
    }
}


class NewsSearch {

    constructor()
    {

    }

    searchNews(query, pageSize, page)
    {
        return new Promise((resolve,reject)=>{
            let inurl = 'https://newsapi.org/v2/everything?from=2019-12-05&sortBy=popularity&apiKey=fe3f2cac492c45b98bc0830f90db7637&q=' + query +'&pageSize='+ pageSize +'&page='+ page;
             fetch(inurl,{
                mode: "cors"
            }).then(res=>res.json()).then(resp=>{
                resolve(resp);
            });
        })
    }
}

class QuerySolrSearch{

    constructor()
    {

    }

    getResults(text, start, rows, lang, country){
        let englishText = "";
        let hindiText = "";
        let portugueseText = "";
        let commonText = "";
        if(lang==null)
        {
            return new Promise((resolve,reject)=>{
                Window.CustomTranslatorSearch.getTranslatedText(text,"en").then(res=>{
                    englishText = "(" + encodeURIComponent(res.text) + ")"
                    console.log(englishText);
                    console.log(encodeURIComponent(res.text));
                    Window.CustomTranslatorSearch.getTranslatedText(text,"hi").then(res=>{
                        hindiText = "(" + encodeURIComponent(res.text) + ")"
                        console.log(hindiText);
                        Window.CustomTranslatorSearch.getTranslatedText(text,"pt").then(res=>{
                            portugueseText = "(" + encodeURIComponent(res.text) + ")"
                            console.log(portugueseText);
                            let data = this.querySolr(text,englishText, hindiText, portugueseText,res.srcLang, start, rows, country).then(data=>{
                                resolve(data);
                            });
                        })
                    })
                })
            })
        }
        else if(lang=="en")
        {
            return new Promise((resolve,reject)=>{
                var originaltext = text;
                Window.CustomTranslatorSearch.getTranslatedText(text,"en").then(res=>{
                    if(res.srcLang=="en")
                    {
                        let data = this.querySolr(text, englishText, null, null, res.srcLang, start, rows, country, true, lang, originaltext).then(data=>{
                            resolve(data);
                        });
                    }
                    else {
                        
                        commonText = "(" + encodeURIComponent(originaltext) + ")" + " OR " + "(" + encodeURIComponent(res.text) + ")";
                        console.log(portugueseText);
                        let data = this.querySolr(text, englishText, null, null, res.srcLang, start, rows, country, true, lang, commonText).then(data=>{
                            resolve(data);
                        });
                    }
                })

            })
        }
        else if(lang=="hi")
        {
            return new Promise((resolve,reject)=>{
                var originaltext = text;

                Window.CustomTranslatorSearch.getTranslatedText(text,"hi").then(res=>{

                if(res.srcLang=="hi")
                {
                    let data = this.querySolr(text, englishText, null, null, res.srcLang, start, rows, country, true, lang, originaltext).then(data=>{
                        resolve(data);
                    });
                }
                else {
                    
                    commonText = "(" + encodeURIComponent(originaltext) + ")" + " OR " + "(" + encodeURIComponent(res.text) + ")" ;
                    console.log(portugueseText);
                    let data = this.querySolr(text, englishText, null, null, res.srcLang, start, rows, country, true, lang, commonText).then(data=>{
                        resolve(data);
                    });
                }
            });
        })

        }
        else if(lang=="pt")
        {
            return new Promise((resolve,reject)=>{
                var originaltext = text;

                Window.CustomTranslatorSearch.getTranslatedText(text,"pt").then(res=>{
               
                if(res.srcLang=="pt")
                {
                    let data = this.querySolr(text, englishText, null, null, res.srcLang, start, rows, country, true, lang, originaltext).then(data=>{
                        resolve(data);
                    });
                }
                else {
                    
                    commonText = "(" + encodeURIComponent(originaltext) + ")" + " OR " + "(" + encodeURIComponent(res.text) + ")" ;
                    console.log(portugueseText);
                    let data = this.querySolr(text, englishText, null, null, res.srcLang, start, rows, country, true, lang, commonText).then(data=>{
                        resolve(data);
                    });
                }
            });

            });
        }

	}
	
    querySolr(defaultText,englishText,hindiText,portugueseText,srcLang,start,rows, country, isFromSpecificSearch, lang, commonText){
        if(isFromSpecificSearch)
        {
            return new Promise((resolve,reject)=>{
                let inurl = 'http://3.15.172.27:8984/solr/'+ "IRF19P4" + '/select?&qf=tweet_text&defType=dismax&q='+ commonText+'&rows='+rows+'&start='+ start + ((country!=null) ? '&fq=country:' + country : '') + ((lang!=null) ? '&fq=lang:'+ lang : ' ');
                 fetch(inurl,{
                    mode: "cors"
                }).then(res=>res.json()).then(resp=>{
                    resolve(resp.response);
                });
            })
        }
        else{
            
            let boostFactorEn = 1.0;
            let boostFactorHi = 1.0;
            let boostFactorPt = 1.0;
            switch(srcLang) { 
                case 'en': { 
                boostFactorEn = 5.0;
                break; 
                } 
                case 'hi': { 
                    boostFactorHi = 5.0;
                break; 
                }
                case 'pt': { 
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

            let query = "";
            if(srcLang == "it"){
                query = encodeURIComponent(defaultText) + "^" + 5 + " OR " + englishText + "^" + boostFactorEn + " OR " + hindiText + "^" + boostFactorHi +
                " OR " + portugueseText + "^" + boostFactorPt;
            }else{
                query = englishText + "^" + boostFactorEn + " OR " + hindiText + "^" + boostFactorHi +
            " OR " + portugueseText + "^" + boostFactorPt;
            }
            return new Promise((resolve,reject)=>{
                let inurl = 'http://3.15.172.27:8984/solr/'+ "IRF19P4" + '/select?q=tweet_text:' + query+'&rows='+rows+'&start='+start + ((country!=null) ? '&fq=country:' + country : '');
                fetch(inurl,{
                    mode: "cors"
                }).then(res=>res.json()).then(resp=>{
                    resolve(resp.response);
                });
            })
        }
    }

}

Window.QuerySolrSearch = new QuerySolrSearch();
Window.HashTagSearch = new HashTagSearch();
Window.NewsSearch = new NewsSearch();


$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    $(".previous").attr("pageno","0");
    var $box = $(this);
    console.log($(this).parent().text());
    if ($box.is(":checked")) {
      // the name of the box is retrieved using the .attr() method
      // as it is assumed and expected to be immutable
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      // the checked state of the group/box on the other hand will change
      // and the current value is retrieved using .prop() method
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });

$(".news").unbind('click').bind('click', function(event)
{
    $(".previous").attr("pageno",0);
    $(".searchResults").empty();
    var start = parseInt($(".previous").attr("pageno") + 1);
    var limit = parseInt($(".next").attr("limit")); 
    $(".buttonHolders").addClass('hideit');
    displayNews(start, limit);
});

$(".tweets").unbind('click').bind('click', function(event)
{
    $('.news').removeClass('active');
    $('.tweets').addClass('active');
    $('.search').trigger('click');
});

$(".previous").unbind('click').bind('click', function(event)
{
    var start = parseInt($(".previous").attr("pageno"));
    var limit = parseInt($(".next").attr("limit"));
    if(start != 0)
    {
        if($(".buttonHolders").attr('active')=='hash')
        {
            displayHash(start-10, limit);
        }
        else {
            displayResults(start-10, limit);
        }

        if(start-10 == 0)
        {
            $(".previous").addClass("invalid");
        }

        // $(".previous").attr("pageno", (start-10));
    }
});

$(".next").unbind('click').bind('click', function(event)
{
    var start = parseInt($(".previous").attr("pageno"));
    var limit = parseInt($(".next").attr("limit"));
    if($(".buttonHolders").attr('active')=='hash')
    {
        displayHash(start+10, limit);
    }
    else {
        displayResults(start+10, limit);
    }
    

    // $(".previous").attr("pageno", (start+10));
    
});

document.getElementById('search-bar').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
        $(".search").trigger('click');
      return false;
    }
  }

$(".search").bind('click', function(event) {

    $(".buttonHolders").removeClass('hideit');
    var start = parseInt($(".previous").attr("pageno"));
    var limit = parseInt($(".next").attr("limit"));
    $(".buttonHolders").attr('active','search');
    $(".buttonHolders").removeAttr('name');
    displayResults(start, limit);
    $(".queryBasedAnalysis").trigger('click');
});

$("#search-bar").change(function() { 
    $(".previous").attr("pageno",0);
});

$(".hash").bind('click', function(event) {
    $(".buttonHolders").removeClass('hideit');
    $(".buttonHolders").attr('active','hash');
    var data = $(this).attr('name');
    $(".buttonHolders").attr('name', data);
    $(".previous").attr("pageno",0);
    displayHash(0, 10);
});

function displayHash(start, limit)
{
    var data = $(".buttonHolders").attr('name');
    $(".searchResults").empty();
    $(".searchResults").removeClass("hideit");
    return result = Window.HashTagSearch.searchSolr(data, start, limit).then(data=>{
        $(".previous").attr("pageno", (data.start));
        $(".next").attr("limit", 10);
        if(data.docs.length<=0)
        {
            $(".next").addClass('invalid');
            $('.searchResults').append("<th class =\"Nodata\"> Please enter a search Query </th>");
            $('.searchResults').addClass("minimal");
        }
        else {    
        $(".next").removeClass('invalid');
        $.each(data.docs, function(i, item) {
            var $tr = $('<tr>').append(
                $('<td class="country">').text(item.country),
                $('<td class="text">').text(item.tweet_text),
                $('<td class="sentiment">').text(item.sentiment),
                $('<td class="poiname">').text(item.poi_name),
                $('<td class="topics">').text(item.topic[0])
            ).appendTo('.searchResults');
        });
        }
        $('.searchResults').prepend('<th><tr><th>Country</th><th>Tweet text</th><th>Sentiment</th><th>poi name</th><th>Topic</th></tr>');    
    });
}

function displayNews(page, pageSize)
{
    var data = $("#search-bar").val();
    if(data.length>0)
    {
        $('.tweets').removeClass('active');
        $('.news').addClass('active');
        $(".searchResults").empty();
        $(".searchResults").removeClass("hideit");
        return result = Window.NewsSearch.searchNews(data, pageSize, page).then(data=>{
            if(data.articles.length<=0)
            {
                $(".next").addClass('invalid');
                $('.searchResults').append("<th class =\"Nodata\"> Please enter a search Query </th>");
                $('.searchResults').addClass("minimal");
            }
            else {    
            $(".next").removeClass('invalid');
            $.each(data.articles, function(i, item) {
                var $tr = $('<tr>').append(
                    $('<td class="country">').text(item.author),
                    $('<td class="text">').text(item.description),
                    $('<td class="sentiment">').html("<a id=\"myLink\" href="+item.url+" target=\"_blank\">"+item.url+"</a>"),
                    $('<td class="poiname">').text(item.publishedAt)
                ).appendTo('.searchResults');
            });
            }
            $('.searchResults').prepend('<th><tr><th>Author</th><th>Headline</th><th>URl of the article</th><th> Published time</th></tr>');    
        });
    }
    else {
        
        $(".next").addClass('invalid');
        $('.searchResults').append("<th class =\"Nodata\"> Please enter a search Query </th>");
        $('.searchResults').addClass("minimal");
        $('.searchResults').removeClass("hideit");
    }
    
}

function displayResults(start, limit)
{
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

    var data = $("#search-bar").val();
    $(".searchResults").empty();
    $(".searchResults").removeClass("hideit");
    if(data.length==0)
    {
        $('.searchResults').append("<th class =\"Nodata\"> Please enter a search Query </th>");
        $('.searchResults').addClass("minimal");
    }
    else{
    return result = Window.QuerySolrSearch.getResults(data,start,limit, lang, country).then(data=>{
        $(".previous").attr("pageno", (data.start));
        $(".next").attr("limit", 10);
        if(data.docs.length<=0)
        {
            $(".next").addClass('invalid');
            $('.searchResults').append("<td class =\"Nodata\"> Please enter a search Query </td>");
            $('.searchResults').addClass("minimal");
        }
        else {    
            $(".next").removeClass('invalid');
            $.each(data.docs, function(i, item) {
                var $tr = $('<tr>').append(
                    $('<td class="country">').text(item.country),
                    $('<td class="text">').text(item.tweet_text),
                    $('<td class="sentiment">').text(item.sentiment),
                    $('<td class="poiname">').text(item.poi_name),
                    $('<td class="topics">').text(item.topic[0])
                ).appendTo('.searchResults');
            });
            $('.searchResults').prepend('<th><tr><th>Country</th><th>Tweet text</th><th>Sentiment</th><th>poi name</th> <th>Topic</th></tr>'); 
        }   
    });
    }
}
});