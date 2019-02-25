import Plugin, { init } from "@/modules/_utils/Plugin";

class Flowplayer extends Plugin {
  defaults() {
    return {};
  }

  loadPage() {
    let api,
      container = document.getElementById("player"),
      choice1 = document.querySelector("#choice1"),
      typewarning = document.getElementById("typewarning"),
      audiowarning = document.getElementById("audiowarning"),
      video = document.createElement("video"),
      fileElem1 = document.getElementById("file1"),
      fileElem2 = document.getElementById("file2"),
      info = document.getElementById("info");

    let clip = {
      cuepoints: [2, 4, 6, 8],
      sources: [{ type: "video/mp4", src: "//edge.flowplayer.org/bauhaus.mp4" }]
    };

    flowplayer(container, {
      ratio: false,
      autoplay: false,
      embed: false,
      clip: clip
    });

    if (!flowplayer.support.video) {
      choice1.innerHTML =
        "This demo only works in browsers supporting HTML5 video.";
      return;
    }

    let uploadArray = [];

    function handleUpload(Node, number, duration, title) {
      const choiceNode = document.querySelector(`span.ftype${number + 1}`);
      const source = document.querySelector(`#source${number + 1}`);

      let file = Node.files[0],
        canplay = !!video.canPlayType(file.type).replace("no", ""),
        // hls is always considered as audio/mpegurl locally
        // so we cannot avoid a player error without excluding hls video
        isaudio =
          file.type.indexOf("audio/") === 0 && file.type !== "audio/mpegurl";

      source.src = URL.createObjectURL(file);
      source.parentNode.load();

      choiceNode.innerHTML = file.type;

      [typewarning, audiowarning].forEach(function(elem) {
        elem.style.display = "none";
      });

      if (canplay && !isaudio) {
        const cuepointsDuration = [];
        cuepointsDuration[0] = duration;

        uploadArray[number] = {
          cuepoints: cuepointsDuration,
          title: title,
          sources: [{ type: file.type, src: URL.createObjectURL(file) }]
        };

        api = flowplayer(container, {
          ratio: false,
          autoplay: true,
          embed: false,
          clip: clip
        });

        api.on("ready", function(e, api, video) {
          // for info
          document.getElementById("src").innerHTML = video.src;
        });

        api.on("cuepoint", function(e, api, cuepoint) {
          if (cuepoint.time === clip.cuepoints[number * 2]) {
            info.innerHTML = document.querySelector(
              `#titleVideo${number + 1}`
            ).value;
            api.load(uploadArray[number], function(e, api) {
              api.disable(false);
            });
          } else if (cuepoint.time === uploadArray[number].cuepoints[0]) {
            info.innerHTML = "";
            api.disable(false).load(clip, function(e, api) {
              api.seek(clip.cuepoints[number * 2 + 1]);
            });
          }
        });
      } else if (!canplay) {
        typewarning.querySelector("span#ftype").innerHTML = file.type;
        typewarning.style.display = "block";
      } else {
        audiowarning.style.display = "block";
      }
    }

    fileElem1.addEventListener("change", () =>
      handleUpload(fileElem1, 0, 3, "Первое видео")
    );
    fileElem2.addEventListener("change", () =>
      handleUpload(fileElem2, 1, 5, "Второе видео")
    );
  }

  init() {
    window.addEventListener("load", this.loadPage);
  }

  buildCache() {}

  bindEvents() {}
}

export default init(Flowplayer, "flowplayer");
