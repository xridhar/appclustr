import { Component, OnInit, HostListener } from '@angular/core';
import { TweenLite, Power2, Power1, TimelineMax, TweenMax, gsap } from "gsap";

@Component({
  selector: 'app-staging',
  templateUrl: './staging.component.html',
  styleUrls: ['./staging.component.scss']
})
export class StagingComponent implements OnInit {
  @HostListener('document:mousemove', ['$event']) onMouseMove(e) {
    let cx = Math.ceil(window.innerWidth / 2.0);
    let cy = Math.ceil(window.innerHeight / 2.0);
    let dx = e.pageX - cx;
    let dy = e.pageY - cy;

    let tiltx = (dy / cy);
    let tilty = - (dx / cx);
    let radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
    let degree = (radius * 20);
    let speechBubbleEle = document.getElementById('speechBubble');
    speechBubbleEle.style.transform = 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)';
  }
  constructor() { }

  ngOnInit(): void {
    this.floatingAnimation();
    this.cloudAnim();
    this.cloudAnim2();
    // this.blinkEyes();
    this.speechBubble();
  }


  floatingAnimation() {

    const fullPage = document.querySelector('.landscape');
    const completePage = new TimelineMax();
    completePage.set(fullPage, { x: 0, scale: 30 });
    completePage.to(fullPage, 10, { scale: 1, ease: Power2.easeOut });


    const flyingClustr = document.querySelector(".flyingClustr > svg");
    const tlZoom = new TimelineMax({ repeat: 0 });
    // tlZoom.set(flyingClustr, { y: 10, x: 10, scale: 5});
    // tlZoom.to(flyingClustr, 10, { scale: 1, ease: Power2.easeOut});
    TweenMax.fromTo(flyingClustr, 10, {scale:7}, {scale:1, left:'10px', top:'10px', ease:Power2.easeOut});
    /*Can Animation*/

    const tlCan = new TimelineMax({ repeat: -1 });
    tlCan
      //move top left
      .to(flyingClustr, 3, { y: '-=30', x: '+=20', rotation: '-=5', ease: Power1.easeInOut })

      //move down right
      .to(flyingClustr, 2, { y: '+=30', x: '-=20', rotation: '-=5', ease: Power1.easeInOut })


      .to(flyingClustr, 3, { y: '-=20', rotation: '+=5', ease: Power1.easeInOut })

      .to(flyingClustr, 3, { y: '+=20', rotation: '+=5', ease: Power1.easeInOut });

    const movingHand = document.querySelector("#hand");

    const tlHand = new TimelineMax({ repeat: -1 });
    /*Can Animation*/
    tlHand
      .to(movingHand, 2, { y: -2, x: 1, rotation: '+=6', ease: Power1.easeInOut })
      .to(movingHand, 2, { y: 0, x: 0, rotation: '-=6', ease: Power1.easeInOut })
  }

  random(min, max) {
    if (max == null) { max = min; min = 0; }
    return Math.random() * (max - min) + min;
  }

  cloudAnim() {
    let tl = new TimelineMax({ repeat: -1 })
      .set('.cloud', { x: -500 })
      .to('.cloud', 15, { x: window.innerWidth + 10 })
  }

  cloudAnim2() {
    let tl2 = new TimelineMax({ repeat: -1 })
      .set('.cloud2', { x: -300, opacity: 100 })
      .to('.cloud2', 20, { x: window.innerWidth + 10, opacity: 0 })
  }

  blinkEyes() {
    TweenMax.to("#lefteye", 1, { scaleY:0, repeat: -1, ease: Power1.easeInOut, yoyo: true, repeatDelay: 1 });
    TweenMax.to("#righteye", 1, { scaleY:0, repeat: -1, ease: Power1.easeInOut, yoyo: true, repeatDelay: 1 });
  }

  speechBubble() {
    // CustomBounce.create("myBounce", {strength:0.7, squash:3});
    TweenMax.to('#start', 2, { opacity:1, morphSVG: '#end', scaleX: 6, scaleY: 8, ease: "myBounce-squash", transformOrigin: "center bottom", delay: 10 });

    let quote = new TimelineMax({ repeat: 0 });

    quote.to('#quote', 2, { y: -15, opacity: 1, ease: Power2.easeIn, delay: 12 })
  }
}
