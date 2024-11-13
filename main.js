const API_KEY = "googleMapAPI_KEY";

async function getData() {
    const url = `https://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?serviceKey=${API_KEY}&searchYearCd=2021&siDo=11&guGun=110&type=json&numOfRows=10&pageNo=1`;
    const response = await fetch(url)
    const data = await response.json();
    console.log("data",data);
    const locations = data.items.item.map(spot => [spot.spot_nm,spot.la_crd,spot.lo_crd]);

    console.log("locations",locations);
    drawMap(locations)
}



function drawMap(locations) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    //   mapId: "YOUR_MAP_ID_HERE", // 유효한 지도 ID를 입력하세요
    });
  
    const infowindow = new google.maps.InfoWindow();
  
    for (let i = 0; i < locations.length; i++) {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map, // map 객체 직접 전달
        title: locations[i][0], // 마커 제목을 추가할 수 있습니다
      });
  
      // gmp-click 이벤트 리스너
      marker.element.addEventListener("gmp-click", () => {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      });
    }
  }

getData();
