"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SOURCES = [
  { src: '/images/projects/bittorrent/01-full.jpg', caption: 'BitTorrent' },
  { src: '/images/projects/shiftdrink/02-full.jpg', caption: 'ShiftDrink' },
  { src: '/images/projects/red-moon-apostles/01-full.jpg', caption: 'Red Moon Apostles' },
  { src: '/images/projects/mad-denizen/01-full.jpg', caption: 'Mad Denizen' },
  { src: '/images/projects/alluvial/01-full.jpg', caption: 'Alluvial Wine' },
  { src: '/images/projects/protools/01-full.jpg', caption: 'Pro Tools' },
  { src: '/images/projects/rainberry/01-full.jpg', caption: 'Rainberry' },
  { src: '/images/projects/utorrent/01-full.jpg', caption: 'uTorrent' },
  { src: '/images/projects/bittorrent/06-full.jpg', caption: 'BitTorrent' },
];

const LAYOUT_DATA = [
  { x: 71, y: 58, w: 400, h: 270 },
  { x: 211, y: 255, w: 540, h: 360 },
  { x: 631, y: 158, w: 400, h: 270 },
  { x: 1191, y: 245, w: 260, h: 195 },
  { x: 351, y: 687, w: 260, h: 290 },
  { x: 751, y: 824, w: 205, h: 154 },
  { x: 911, y: 540, w: 260, h: 350 },
  { x: 1051, y: 803, w: 400, h: 300 },
  { x: 71, y: 922, w: 350, h: 260 },
];

const ORIGINAL_SIZE = { w: 1600, h: 1200 };

interface GridItem {
  el: HTMLDivElement;
  container: HTMLDivElement;
  wrapper: HTMLDivElement;
  img: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  extraX: number;
  extraY: number;
  rect: DOMRect;
  ease: number;
}

export default function InfiniteGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $container = containerRef.current;
    if (!$container) return;

    const sources = SOURCES;
    const data = LAYOUT_DATA;
    const originalSize = ORIGINAL_SIZE;

    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let tileSize = { w: 0, h: 0 };

    const scroll = {
      ease: 0.06,
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      last: { x: 0, y: 0 },
      delta: { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } },
    };

    let isDragging = false;
    const drag = { startX: 0, startY: 0, scrollX: 0, scrollY: 0 };

    const mouse = {
      x: { t: 0.5, c: 0.5 },
      y: { t: 0.5, c: 0.5 },
      press: { t: 0, c: 0 },
    };

    let items: GridItem[] = [];
    let rafId: number;
    let mounted = true;
    let driftTime = 0;

    const onResize = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;

      tileSize = {
        w: winW,
        h: winW * (originalSize.h / originalSize.w),
      };

      scroll.current = { x: 0, y: 0 };
      scroll.target = { x: 0, y: 0 };
      scroll.last = { x: 0, y: 0 };

      $container.innerHTML = "";

      const scaleX = tileSize.w / originalSize.w;
      const scaleY = tileSize.h / originalSize.h;
      const baseItems = data.map((d, i) => {
        const source = sources[i % sources.length];
        return {
          src: source.src,
          caption: source.caption,
          x: d.x * scaleX,
          y: d.y * scaleY,
          w: d.w * scaleX,
          h: d.h * scaleY,
        };
      });

      items = [];
      const repsX = [0, tileSize.w];
      const repsY = [0, tileSize.h];

          baseItems.forEach((base) => {
        repsX.forEach((offsetX) => {
          repsY.forEach((offsetY) => {
            const el = document.createElement("div");
            el.classList.add("ig-item");
            el.style.width = `${base.w}px`;

            const wrapper = document.createElement("div");
            wrapper.classList.add("ig-item-wrapper");
            el.appendChild(wrapper);

            const itemImage = document.createElement("div");
            itemImage.classList.add("ig-item-image");
            itemImage.style.width = `${base.w}px`;
            itemImage.style.height = `${base.h}px`;
            wrapper.appendChild(itemImage);

            const img = new Image();
            img.src = base.src;
            itemImage.appendChild(img);

            $container.appendChild(el);

            items.push({
              el,
              container: itemImage,
              wrapper,
              img,
              x: base.x + offsetX,
              y: base.y + offsetY,
              w: base.w,
              h: base.h,
              extraX: 0,
              extraY: 0,
              rect: el.getBoundingClientRect(),
              ease: Math.random() * 0.5 + 0.5,
            });
          });
        });
      });

      tileSize.w *= 2;
      tileSize.h *= 2;

      scroll.current.x = scroll.target.x = scroll.last.x = -winW * 0.1;
      scroll.current.y = scroll.target.y = scroll.last.y = -winH * 0.1;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = 0.4;
      scroll.target.x -= e.deltaX * factor;
      scroll.target.y -= e.deltaY * factor;
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = true;
      document.documentElement.classList.add("ig-dragging");
      mouse.press.t = 1;
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      drag.scrollX = scroll.target.x;
      drag.scrollY = scroll.target.y;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.documentElement.classList.remove("ig-dragging");
      mouse.press.t = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x.t = e.clientX / winW;
      mouse.y.t = e.clientY / winH;

      if (isDragging) {
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        scroll.target.x = drag.scrollX + dx;
        scroll.target.y = drag.scrollY + dy;
      }
    };

    const render = () => {
      if (!mounted) return;
      // Auto-drift: speed cycles up then down (0.06–0.4 over ~10s)
      if (!isDragging) {
        driftTime += 1;
        const cycle = 0.5 + 0.5 * Math.sin(driftTime * 0.01);
        const speedX = 0.06 + 0.34 * cycle;
        const speedY = 0.03 + 0.17 * cycle;
        scroll.target.x += speedX;
        scroll.target.y += speedY;
      }
      scroll.current.x += (scroll.target.x - scroll.current.x) * scroll.ease;
      scroll.current.y += (scroll.target.y - scroll.current.y) * scroll.ease;

      scroll.delta.x.t = scroll.current.x - scroll.last.x;
      scroll.delta.y.t = scroll.current.y - scroll.last.y;
      scroll.delta.x.c += (scroll.delta.x.t - scroll.delta.x.c) * 0.04;
      scroll.delta.y.c += (scroll.delta.y.t - scroll.delta.y.c) * 0.04;
      mouse.x.c += (mouse.x.t - mouse.x.c) * 0.04;
      mouse.y.c += (mouse.y.t - mouse.y.c) * 0.04;
      mouse.press.c += (mouse.press.t - mouse.press.c) * 0.04;

      const dirX = scroll.current.x > scroll.last.x ? "right" : "left";
      const dirY = scroll.current.y > scroll.last.y ? "down" : "up";

      items.forEach((item) => {
        const newX = 5 * scroll.delta.x.c * item.ease + (mouse.x.c - 0.5) * item.rect.width * 0.6;
        const newY = 5 * scroll.delta.y.c * item.ease + (mouse.y.c - 0.5) * item.rect.height * 0.6;
        const scrollX = scroll.current.x;
        const scrollY = scroll.current.y;
        const posX = item.x + scrollX + item.extraX + newX;
        const posY = item.y + scrollY + item.extraY + newY;

        const beforeX = posX > winW;
        const afterX = posX + item.rect.width < 0;
        if (dirX === "right" && beforeX) item.extraX -= tileSize.w;
        if (dirX === "left" && afterX) item.extraX += tileSize.w;

        const beforeY = posY > winH;
        const afterY = posY + item.rect.height < 0;
        if (dirY === "down" && beforeY) item.extraY -= tileSize.h;
        if (dirY === "up" && afterY) item.extraY += tileSize.h;

        const fx = item.x + scrollX + item.extraX + newX;
        const fy = item.y + scrollY + item.extraY + newY;
        item.el.style.transform = `translate(${fx}px, ${fy}px)`;
        item.img.style.transform = `scale(${1.2 + 0.2 * mouse.press.c * item.ease}) translate(${-mouse.x.c * item.ease * 10}%, ${-mouse.y.c * item.ease * 10}%)`;
      });

      scroll.last.x = scroll.current.x;
      scroll.last.y = scroll.current.y;

      rafId = requestAnimationFrame(render);
    };

    const initIntro = () => {
      const introItems = [...$container.querySelectorAll<HTMLElement>(".ig-item-wrapper")].filter((item) => {
        const rect = item.getBoundingClientRect();
        return (
          rect.x > -rect.width &&
          rect.x < window.innerWidth + rect.width &&
          rect.y > -rect.height &&
          rect.y < window.innerHeight + rect.height
        );
      });
      introItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const x = -rect.x + window.innerWidth * 0.5 - rect.width * 0.5;
        const y = -rect.y + window.innerHeight * 0.5 - rect.height * 0.5;
        gsap.set(item, { x, y });
      });
      gsap.set(introItems, { opacity: 0 });
      gsap.to(introItems, { opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.2 });
      gsap.to(introItems.reverse(), {
        duration: 2.8,
        ease: "expo.inOut",
        x: 0,
        y: 0,
        stagger: 0.08,
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("mousemove", onMouseMove);
    $container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    onResize();
    initIntro();
    rafId = requestAnimationFrame(render);

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousemove", onMouseMove);
      $container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("ig-dragging");
    };
  }, []);

  return (
    <>
      <style>{`
        .infinite-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: var(--color-black);
        }
        .infinite-grid__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .ig-item {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
        }
        .ig-item-wrapper {
          position: relative;
          will-change: transform;
        }
        .ig-item-image {
          overflow: hidden;
          position: relative;
        }
        .ig-item-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }
      `}</style>
      <div className="infinite-grid">
        <div ref={containerRef} className="infinite-grid__canvas" />
      </div>
    </>
  );
}
