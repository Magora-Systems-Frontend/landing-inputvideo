import FastClick from "fastclick";
import svg4everybody from "svg4everybody";

import * as serviceWorker from "./helpers/serviceWorker";

import ready from "@/modules/_utils/dom/ready";

import Browsehappy from "@/modules/browsehappy/browsehappy";
import Offcanvas from "@/modules/offcanvas/offcanvas";
import File from "@/modules/file/file";
import Code from "@/modules/code/code";
import Header from "@/modules/header/header";
import ScrollTop from "@/modules/scroll-top/scroll-top";
import InputPassword from "@/modules/input/inputPassword";
import Demo from "@/modules/demo/demo";
import MainMenu from "@/modules/main-menu/main-menu";
import NetworkStatus from "@/modules/network-status/network-status";
import Dropvideo from "@/modules/dropvideo/dropvideo";

// Factories class based plugins
Browsehappy(".browsehappy");
Offcanvas();
File(".file");
Code("pre.code");
Header(".header");
ScrollTop(".scroll-top");
InputPassword(".input_type_password");
NetworkStatus();
Dropvideo();

// Simple functional plugins
Demo();
MainMenu();

ready(function() {
  FastClick.attach(document.body);
  svg4everybody();
});

// If you want your app to work offline and load faster, you can change
// `unregister()` to `register()` below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

module.exports = {
  // Offcanvas,
  File,
  Code,
  Header,
  ScrollTop,
  InputPassword,
  Dropvideo
};
