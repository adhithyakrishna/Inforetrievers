class GoogleMap {
  coordinates = {
    brasil: { lat: -14.235004, lng: -51.92528 },
    "washington, dc": { lat: 38.9071923, lng: -77.0368707 },
    "patna, bihar, india": { lat: 25.5940947, lng: 85.1375645 },
    "vermont/dc": { lat: 38.9092768, lng: -77.03016889999999 },
    "brasília, brasil": { lat: -15.826691, lng: -47.92182039999999 },
    "rio de janeiro-rj": { lat: -22.9068467, lng: -43.1728965 },
    india: { lat: 20.593684, lng: 78.96288 },
    "san francisco": { lat: 37.7749295, lng: -122.4194155 },
    "wilmington, de": { lat: 39.744655, lng: -75.5483909 },
    massachusetts: { lat: 42.4072107, lng: -71.3824374 },
    "new york, ny": { lat: 40.7127753, lng: -74.0059728 },
    california: { lat: 36.778261, lng: -119.4179324 },
    "madhya pradesh, india": { lat: 22.9734229, lng: 78.6568942 },
    "são paulo - sp": { lat: -23.5505199, lng: -46.63330939999999 },
    "são paulo": { lat: -23.5505199, lng: -46.63330939999999 },
    "lucknow, india": { lat: 26.8466937, lng: 80.94616599999999 },
    "madhya pradesh": { lat: 22.9734229, lng: 78.6568942 },
    "united states": { lat: 37.09024, lng: -95.712891 },
    "são paulo, brasil": { lat: -23.5505199, lng: -46.63330939999999 },
    "rio de janeiro, brasil": { lat: -22.9068467, lng: -43.1728965 },
    "california, usa": { lat: 36.778261, lng: -119.4179324 },
    usa: { lat: 37.09024, lng: -95.712891 },
    "rio de janeiro": { lat: -22.9068467, lng: -43.1728965 },
    "florida, usa": { lat: 27.6648274, lng: -81.5157535 },
    "texas, usa": { lat: 31.9685988, lng: -99.9018131 },
    "los angeles, ca": { lat: 34.0522342, lng: -118.2436849 },
    brazil: { lat: -14.235004, lng: -51.92528 },
    "new delhi, india": { lat: 28.6139391, lng: 77.2090212 },
    "new york, usa": { lat: 40.7127753, lng: -74.0059728 },
    "new jersey, usa": { lat: 40.0583238, lng: -74.4056612 },
    "ohio, usa": { lat: 40.4172871, lng: -82.90712300000001 },
    "michigan, usa": { lat: 44.3148443, lng: -85.60236429999999 },
    earth: { lat: 37.2321077, lng: -95.7243335 },
    "curitiba, brasil": { lat: -25.4808762, lng: -49.3044253 },
    "belo horizonte, brasil": { lat: -19.9166813, lng: -43.9344931 },
    "north carolina, usa": { lat: 35.7595731, lng: -79.01929969999999 },
    "salvador, brasil": { lat: -12.977749, lng: -38.5016301 },
    "colorado, usa": { lat: 39.5500507, lng: -105.7820674 },
    "massachusetts, usa": { lat: 42.4072107, lng: -71.3824374 },
    texas: { lat: 31.9685988, lng: -99.9018131 },
    "arizona, usa": { lat: 34.0489281, lng: -111.0937311 },
    "pennsylvania, usa": { lat: 41.2033216, lng: -77.1945247 },
    "sao paulo, brazil": { lat: -23.5505199, lng: -46.63330939999999 },
    "minas gerais, brasil": { lat: -18.512178, lng: -44.5550308 },
    "virginia, usa": { lat: 37.4315734, lng: -78.6568942 },
    "patna, india": { lat: 25.5940947, lng: 85.1375645 },
    "fortaleza, brasil": { lat: -3.7327144, lng: -38.5269981 },
    "georgia, usa": { lat: 32.1656221, lng: -82.9000751 },
    "san diego, ca": { lat: 32.715738, lng: -117.1610838 },
    "boston, ma": { lat: 42.3600825, lng: -71.0588801 },
    "manaus, brasil": { lat: -3.1190275, lng: -60.0217314 },
    "mumbai, india": { lat: 19.0759837, lng: 72.8776559 },
    "chicago, il": { lat: 41.8781136, lng: -87.6297982 },
    "florianópolis, brasil": { lat: -27.5948698, lng: -48.54821949999999 },
    florida: { lat: 27.6648274, lng: -81.5157535 },
    "campinas, brasil": { lat: -22.9329252, lng: -47.073845 },
    "maryland, usa": { lat: 39.0457549, lng: -76.64127119999999 },
    "recife, brasil": { lat: -8.0522404, lng: -34.9286096 },
    canada: { lat: 56.130366, lng: -106.346771 },
    "washington, usa": { lat: 47.7510741, lng: -120.7401385 },
    "philadelphia, pa": { lat: 39.9525839, lng: -75.1652215 },
    "austin, tx": { lat: 30.267153, lng: -97.7430608 },
    "new york": { lat: 40.7127753, lng: -74.0059728 },
    "tennessee, usa": { lat: 35.5174913, lng: -86.5804473 },
    "minnesota, usa": { lat: 46.729553, lng: -94.6858998 },
    "rio de janeiro, brazil": { lat: -22.9068467, lng: -43.1728965 },
    "atlanta, ga": { lat: 33.7489954, lng: -84.3879824 },
    ohio: { lat: 40.4172871, lng: -82.90712300000001 },
    "planet earth": { lat: 33.6024029, lng: -111.9818562 },
    "illinois, usa": { lat: 40.6331249, lng: -89.3985283 },
    nyc: { lat: 40.7127753, lng: -74.0059728 },
    "oregon, usa": { lat: 43.8041334, lng: -120.5542012 },
    "dallas, tx": { lat: 32.7766642, lng: -96.79698789999999 },
    "scottsdale, az": { lat: 33.4941704, lng: -111.9260519 },
    "goiânia, brasil": { lat: -16.6868982, lng: -49.2648114 },
    "new jersey": { lat: 40.0583238, lng: -74.4056612 },
    "niterói, brasil": { lat: -22.8859267, lng: -43.1152587 },
    "seattle, wa": { lat: 47.6062095, lng: -122.3320708 },
    "bihar, india": { lat: 25.0960742, lng: 85.31311939999999 },
    "las vegas, nv": { lat: 36.1699412, lng: -115.1398296 },
    "phoenix, az": { lat: 33.4483771, lng: -112.0740373 },
    "porto alegre, brasil": { lat: -30.0346471, lng: -51.2176584 },
    "santa catarina, brasil": { lat: -27.2423392, lng: -50.2188556 },
    भारत: { lat: 20.593684, lng: 78.96288 },
    "belo horizonte": { lat: -19.9166813, lng: -43.9344931 },
    "brooklyn, ny": { lat: 40.6781784, lng: -73.9441579 },
    fortaleza: { lat: -3.7327144, lng: -38.5269981 },
    "london, england": { lat: 51.5073509, lng: -0.1277583 },
    "san francisco, ca": { lat: 37.7749295, lng: -122.4194155 },
    " brasil": { lat: -14.235004, lng: -51.92528 },
    america: { lat: 37.09024, lng: -95.712891 },
    "arkansas, usa": { lat: 35.20105, lng: -91.8318334 },
    "connecticut, usa": { lat: 41.6032207, lng: -73.087749 },
    "denver, co": { lat: 39.7392358, lng: -104.990251 },
    "hardoi, india": { lat: 27.3965071, lng: 80.1250479 },
    "iowa, usa": { lat: 41.8780025, lng: -93.097702 },
    "jundiaí, brasil": { lat: -23.1857076, lng: -46.8978057 },
    "manhattan, ny": { lat: 40.7830603, lng: -73.9712488 },
    "missouri, usa": { lat: 37.9642529, lng: -91.8318334 },
    mumbai: { lat: 19.0759837, lng: 72.8776559 }
  };
  constructor() {}

  getLocationsFromSolr() {
    return new Promise((resolve, reject) => {
      let inurl =
        "http://3.15.172.27:8984/solr/" +
        "IRF19P4" +
        "/select?facet=on&facet.field=user.location&fl=lang&q=*:*";

      return fetch(inurl, {
        mode: "cors"
      })
        .then(res => res.json())
        .then(resp => {
          for (const [i, value] of resp.facet_counts.facet_fields[
            "user.location"
          ].entries()) {
            // console.log("%d: %s", i, value);
            if (typeof value == "string") {
              this.coordinates[value.toLowerCase()] =
                resp.facet_counts.facet_fields["user.location"][i + 1];
            }
          }
          this.getCoordinatesForEveryLocation().then(data => {
            resolve(data);
            // console.log(JSON.stringify(this.coordinates));
          });
        });
    });
  }

  getLocationsOnSolrOnQuery(data, query) {
    return new Promise((resolve, reject) => {
      let results = {};
      let inurl = "";
      if (data.text.trim() != "") {
        inurl =
          "http://3.15.172.27:8984/solr/" +
          "IRF19P4" +
          "/select?q=" +
          query +
          "&defType=edismax&qf=tweet_text&facet=on&facet.field=user.location&fl=lang" +
          (data.country != null ? "&fq=country:" + data.country : "") +
          (data.lang != null ? "&fq=lang:" + data.lang : " ");
      } else {
        resolve(false);
      }

      fetch(inurl, {
        mode: "cors"
      })
        .then(res => res.json())
        .then(resp => {
          for (const [i, value] of resp.facet_counts.facet_fields[
            "user.location"
          ].entries()) {
            // console.log("%d: %s", i, value);
            if (typeof value == "string") {
              if (resp.facet_counts.facet_fields["user.location"][i + 1] != 0) {
                results[value.toLowerCase()] =
                  resp.facet_counts.facet_fields["user.location"][i + 1];
              }
            }
          }

          var map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(0, 0),
            zoom: 2,
            minZoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          let addedResults = [];
          for (let val in results) {
            if (val in this.coordinates) {
              let result = addedResults.find(result => result.lat == this.coordinates[val].lat &&result.lng == this.coordinates[val].lng);
              if(result){
                result.count = result.count + results[val];
              }else{
                addedResults.push({lat:this.coordinates[val].lat,lng:this.coordinates[val].lng,count:results[val]})
              }
            }
          }
          for(let val in addedResults){
            this.addMarker(
              new google.maps.LatLng(
                addedResults[val].lat,
                addedResults[val].lng
              ),
              map,
              addedResults[val].count
            );
          }
          resolve(true);
        });
    });
  }

  addMarker(location, map, tweetCount) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.

    var markerIcon = {
        url: 'https://img.icons8.com/color/48/000000/twitter.png',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25,20),
        labelOrigin: new google.maps.Point(21,18)
      }
    // var markerIcon = {
    //   url: "http://image.flaticon.com/icons/svg/252/252025.svg",
    //   scaledSize: new google.maps.Size(40, 40),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(16, 32),
    //   labelOrigin: new google.maps.Point(20, 17)
    // };
    var marker = new google.maps.Marker({
      position: location,
      icon: markerIcon,
      label: {
        // text: 'Tweet Count: '+tweetCount,
        // color: "#4682B4",
        // border:"1px solid white",
        animation: google.maps.Animation.DROP,
        text: '' + tweetCount,
        color: "black",
        fontSize: "16px"
      },
      map: map
    });
  }

  getCoordinatesForEveryLocation() {
    let promises = [];
    for (let val in this.coordinates) {
      let p = new Promise((resolve, reject) => {
        let url =
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          val +
          "&key=AIzaSyB5QUXpymXW15M8Rc78Ke0PLCUddaVFvcI";
        console.log(url);
        fetch(url, {
          mode: "cors"
        })
          .then(res => res.json())
          .then(resp => {
            if (resp.results[0]) {
              // console.log(resp.results[0].geometry.location);
              this.coordinates[val] = resp.results[0].geometry.location;
            } else {
              // console.log(resp);
            }
            resolve(resp);
          });
      });
      promises.push(p);
    }
    return Promise.all(promises);
  }
}

Window.GoogleMap = new GoogleMap();
// Window.GoogleMap.getLocationsFromSolr();
