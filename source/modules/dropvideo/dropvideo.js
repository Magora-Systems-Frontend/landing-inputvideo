import Plugin, { init } from "@/modules/_utils/Plugin";

class Dropvideo extends Plugin {
  defaults() {
    return {};
  }

  showVideo(file) {
    const format = file.target.value;
    const check = format.match(/\.(mp4|webm|ogg)/);
    if (check) {
      document.querySelector("#videoBlock").hidden = false;
      document.querySelector("#titlePlaceholder").hidden = true;
      const source = document.querySelector("#video_here");
      const videoFile = document.querySelector("#video_input").files[0];
      source.src = URL.createObjectURL(videoFile);
      source.parentNode.load();
    } else {
      alert("This file format is not supported");
      document.querySelector("#video_input").value = "";
    }
  }

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

  init() {}

  buildCache() {}

  bindEvents() {
    document
      .querySelector(".video_wrapper")
      .addEventListener("change", this.showVideo);
    document
      .querySelector("#videoBlock")
      .addEventListener("canplaythrough", this.validateDuration);
  }
}

export default init(Dropvideo, "dropvideo");
