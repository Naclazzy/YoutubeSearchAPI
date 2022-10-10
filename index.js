

var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var res = JSON.parse(xhttp.responseText);
      var videoData = res.items.map(function (item) {
        return item.snippet;
      });

      var container = document.querySelector("#video-divs");
      container.innerHTML = '';
      videoData.forEach(function (video) {
        var videoDiv = document.createElement("div");
        videoDiv.classList.add("video-div");
        videoDiv.innerHTML = `
            <img height=200px src=${video.thumbnails.high.url}>
            <h4>${video.title}</h4>
            <p>${video.channelTitle}</p>
        `;
        container.appendChild(videoDiv);
      });
    }
  };

  var textValue = document.querySelector('#searchbar').value;
  xhttp.open(
    "GET",
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${textValue}&maxResults=9&key=`+ k,
    true
  );
  xhttp.send();
});
