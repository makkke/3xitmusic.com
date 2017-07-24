var players = []
var videoIds = []
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

$(document).ready(function() {
  $('#fullpage').fullpage({
    slidesNavigation: true,
    afterLoad: function () {
      $('#intro').get(0).play();
    },
  });
  videoIds = $(".video")
  onYouTubeIframeAPIReady = function() {
    for(var i = 0; i < videoIds.length; i++) {
      var video = videoIds[i]
      player = new YT.Player(video.id, {
        videoId: video.getAttribute('data-video-id')
      });
      players.push(player)
    }
  }
  console.log('isMobile.any()', isMobile.any())
  if (isMobile.any()) {
    mobileIntro(true)
    $('#intro').remove()
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

function playPauseIntro() {
  var intro = $('#intro').get(0)
  if (!intro.paused) {
    intro.pause()
  } else {
    intro.play()
  }
}

function mobileIntro(showImage) {
  var image = $('#introImage')
  var intro = $('#intro')
  if(showImage) {
    image.css('display','block')
    intro.css('display','none')
  } else {
    if (!mobile.any()) {
      image.css('display','none')
      intro.css('display','block')
      intro.get(0).play()
    }
  }
}
