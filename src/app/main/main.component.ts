import { Component, HostListener, ElementRef, OnInit, ViewChild } from "@angular/core";
import {TweenLite, Power2, Power1, TimelineMax, TweenMax, gsap} from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import {ScrollTrigger} from "gsap/ScrollTrigger";

@Component({
  selector: "main-app",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  @ViewChild('mushroom') box: ElementRef;
  constructor() {}
  gasp = gsap.registerPlugin(ScrollTrigger, TimelineMax, TweenLite);

  ngOnInit() {
    gsap.set("svg", {visibility:"visible"})
    let tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: ".b",
          start: "top center",
          end: "top 100px",
          scrub: true,
          pin: true,
          markers: true,
          id: "scrub"
        }
      }
    );

    gsap.to(".b", {
      x: 400,
      rotation: 360,
      scrollTrigger: {
        trigger: ".b",
        start: "top center",
        end: "top 100px",
        scrub: true,
        pin: true,
        pinSpacing: false,
        markers: true,
        id: "scrub"
      }
    });

    // Or you can attach a tween or timeline to a ScrollTrigger later
const anim = gsap.to(".c", {
  x: 400,
  rotation: 360,
  duration: 3
});

ScrollTrigger.create({
  trigger: ".c",
  animation: anim,
 
});
  
  }
}
