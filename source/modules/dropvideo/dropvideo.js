import Plugin, { init } from "@/modules/_utils/Plugin";

class Dropvideo extends Plugin {
  defaults() {
    return {
      source: document.querySelector("#video_here")
    };
  }

  showVideo(file) {
    const format = file.target.value;
    const check = format.match(/\.(mp4|webm|ogg)/);
    if (check) {
      document.querySelector("#videoBlock").hidden = false;
      document.querySelector("#titlePlaceholder").hidden = true;
      document.querySelector(".load").hidden = false;
      const source = document.querySelector("#video_here");
      const videoFile = document.querySelector("#video_input").files[0];
      source.src = URL.createObjectURL(videoFile);
      source.parentNode.load();
    } else {
      alert("This file format is not supported");
      document.querySelector("#video_input").value = "";
    }
  }

  // showVideo(file) {
  //   const video = document.querySelector(".fp-engine");
  //   const videoFile = document.querySelector("#video_input").files[0];
  //   video.src=URL.createObjectURL(videoFile);
  // }

  validateDuration() {
    const duration = document.querySelector("#videoBlock").duration;

    if (duration < 5 || duration > 30) {
      const source = document.querySelector("#video_here");
      document.querySelector("#video_input").value = "";
      source.src = "";
      source.parentNode.load();
      document.querySelector("#videoBlock").hidden = true;
      document.querySelector("#titlePlaceholder").hidden = false;
      alert("Invalid duration video");
    }
  }

  toggleGrayScale() {
    const videoBlock = document.querySelector("#videoBlock");
    videoBlock.classList.toggle("gray-filter");
  }

  pauseAnimation() {
    document.querySelector(".load").style.animationPlayState = "paused";
  }

  runAnimation() {
    document.querySelector(".load").style.animationPlayState = "running";
  }

  addTextToLoad(e) {
    document.querySelector(".load").innerHTML = e.target.value;
  }

  init() {
    // const feature = {
    //   cuepoints: [10],
    //   title: "feature",
    //   sources: [
    //     { type: "video/mp4",   src: "//edge.flowplayer.org/bauhaus.mp4" },
    //     { type: "video/flash", src: "mp4:bauhaus.mp4" }
    //   ]
    // };
    //
    // const midroll = {
    //   cuepoints: [5],
    //   title: "mid-roll",
    //   sources: [
    //     { type: "video/webm",
    //       src:  "//edge.flowplayer.org/drive.webm" },
    //     { type: "video/mp4",
    //       src:  "//mydomain.com/video.mp4" }
    //   ],
    // }
    //
    // const container = document.getElementById("player");
    // flowplayer(container, {
    //   title: 'Some Title',
    //   seekStep: 15,
    //   clip: feature,
    // }).on("cuepoint",function(e, api, cuepoint) {
    //   if (cuepoint.time === feature.cuepoints[0]) {
    //     api.load(midroll, function (e, api) {
    //       api.disable(true);
    //     });
    //
    //   } else if (cuepoint.time === midroll.cuepoints[0]) {
    //     api.disable(false).load(feature, function (e, api) {
    //       api.seek(feature.cuepoints[0] + 0.2);
    //     });
    //   }
    // });
  }

  buildCache() {}

  bindEvents() {
    // document
    //   .querySelector("#video_input")
    //   .addEventListener("change", this.showVideo);
    // document
    //   .querySelector("#videoBlock")
    //   .addEventListener("canplaythrough", this.validateDuration);
    // document
    //   .querySelector("#videoBlock")
    //   .addEventListener("play", this.runAnimation);
    // document
    //   .querySelector("#videoBlock")
    //   .addEventListener("pause", this.pauseAnimation);
    // document
    //   .querySelector("#gray-filter")
    //   .addEventListener("click", this.toggleGrayScale);
    // document
    //   .querySelector("#addTextToLoad")
    //   .addEventListener("keyup", this.addTextToLoad)
  }
}

export default init(Dropvideo, "dropvideo");
