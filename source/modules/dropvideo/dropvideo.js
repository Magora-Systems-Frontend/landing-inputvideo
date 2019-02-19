import Plugin, { init } from "@/modules/_utils/Plugin";

class Dropvideo extends Plugin {
  defaults() {
    return {};
  }

  showVideo() {
    document.querySelector("#videoBlock").hidden = false;
    const source = document.querySelector("#video_here");
    const videoFile = document.querySelector("#video_input").files[0];
    source.src = URL.createObjectURL(videoFile);
    source.parentNode.load();
  }

  init() {}

  buildCache() {}

  bindEvents() {
    document
      .querySelector(".video_wrapper")
      .addEventListener("change", this.showVideo);
  }
}

export default init(Dropvideo, "dropvideo");
