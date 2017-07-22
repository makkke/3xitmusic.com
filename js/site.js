var players = []
var videoIds = []
$(document).ready(function() {
  $('#fullpage').fullpage({
    slidesNavigation: true,
    afterRender: function () {
      $('video').get(0).play();
    }
  });
  videoIds = $(".video")
  console.log('videoIds', videoIds)
  onYouTubeIframeAPIReady = function() {
    for(var i = 0; i < videoIds.length; i++) {
      var video = videoIds[i]
      player = new YT.Player(video.id, {
        videoId: video.getAttribute('data-video-id')
      });
      players.push(player)
    }
  }
});

function stopVideo(index) {
  if (index > 0){
    players[index].stopVideo()
  }
}

function startVideo(index, player) {
  if (player) {
    swap(index, false)
    player.playVideo()
  }
}

function swap(index, showImage) {
  var video = $('#video' + index)
  var image = $('#image' + index)
  if(showImage) {
    image.css('display','block')
    video.css('display','none')
  } else {
    image.css('display','none')
    video.css('display','block')
  }

}
