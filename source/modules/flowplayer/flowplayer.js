import Plugin, { init } from "@/modules/_utils/Plugin";

class Flowplayer extends Plugin {
  defaults() {
    return {};
  }

  loadPage() {
    let api,
      container = document.getElementById("player"),
      choice = document.getElementById("choice"),
      typewarning = document.getElementById("typewarning"),
      audiowarning = document.getElementById("audiowarning"),
      video = document.createElement("video"),
      fileElem = document.getElementById("file"),
      info = document.getElementById("info");

    var clip = {
      cuepoints: [2, 4, 6],
      sources: [{ type: "video/mp4", src: "//edge.flowplayer.org/bauhaus.mp4" }]
    };

    flowplayer(container, {
      ratio: false,
      autoplay: false,
      embed: false,
      clip: clip
    });

    if (!flowplayer.support.video) {
      choice.innerHTML =
        "This demo only works in browsers supporting HTML5 video.";
      return;
    }

    fileElem.onchange = function() {
      let file = fileElem.files[0],
        canplay = !!video.canPlayType(file.type).replace("no", ""),
        // hls is always considered as audio/mpegurl locally
        // so we cannot avoid a player error without excluding hls video
        isaudio =
          file.type.indexOf("audio/") === 0 && file.type !== "audio/mpegurl";

      choice.querySelector("span.ftype").innerHTML = file.type;

      [typewarning, audiowarning].forEach(function(elem) {
        elem.style.display = "none";
      });

      if (canplay && !isaudio) {
        let uploadVideo1 = {
          cuepoints: [3],
          title: "Uploaded",
          sources: [{ type: file.type, src: URL.createObjectURL(file) }]
        };

        if (api === undefined) {
          api = flowplayer(container, {
            ratio: false,
            autoplay: true,
            embed: false,
            clip: clip
          }).on("ready", function(e, api, video) {
            // for info
            document.getElementById("src").innerHTML = video.src;
          });

          api.on("cuepoint", function(e, api, cuepoint) {
            if (cuepoint.time === clip.cuepoints[0]) {
              info.innerHTML = uploadVideo1.title;
              api.load(uploadVideo1, function(e, api) {
                api.disable(false);
              });
            } else if (cuepoint.time === uploadVideo1.cuepoints[0]) {
              info.innerHTML = "";
              api.disable(false).load(clip, function(e, api) {
                api.seek(clip.cuepoints[2]);
              });
            }
          });
        } else {
          api.load(clip);
        }
      } else if (!canplay) {
        typewarning.querySelector("span.ftype").innerHTML = file.type;
        typewarning.style.display = "block";
      } else {
        audiowarning.style.display = "block";
      }
    };
  }

  init() {
    window.addEventListener("load", this.loadPage);
  }

  buildCache() {}

  bindEvents() {}
}

export default init(Flowplayer, "flowplayer");
