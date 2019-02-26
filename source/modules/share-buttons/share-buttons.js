import Plugin, { init } from "@/modules/_utils/Plugin";
import { createElement } from "@/modules/_utils/dom/createElement";

class ShareButtons extends Plugin {
  defaults() {
    return {
      facebookSelector: "#share-facebook",
      twitterSelector: "#share-twitter",
      link: window.location.href
    };
  }

  init() {
    this.renderButtons();
  }

  buildCache() {
    this.facebook = createElement("div", {
      className: "fb-share-button"
    });

    this.twitter = createElement("a", {
      tittle: "share on twitter",
      className: "twitter-share-button"
    });
  }

  renderButtons() {
    this.element.appendChild(this.facebook);
    this.facebook.setAttribute("data-href", this.options.link);
    this.facebook.setAttribute("data-layout", "button");
    this.facebook.setAttribute("data-mobile-iframe", true);
    this.element.appendChild(this.twitter);
    this.twitter.setAttribute("href", this.options.link);
    this.facebook.setAttribute("data-show-count", false);
  }
}

export default init(ShareButtons, "share-buttons");
