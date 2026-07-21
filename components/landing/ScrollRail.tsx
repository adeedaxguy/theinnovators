import { useRef } from "react";
import type { MouseEvent, PointerEvent, ReactNode } from "react";
import { Icon } from "./Icon";
import { cx } from "./utils";

type ScrollRailProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

export function ScrollRail({ children, className = "", label }: ScrollRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    scrollLeft: 0,
    startX: 0,
  });
  const suppressClickRef = useRef(false);

  function move(direction: number) {
    if (!railRef.current) return;
    const firstItem = railRef.current.firstElementChild;
    const railStyles = window.getComputedStyle(railRef.current);
    const gap = Number.parseFloat(railStyles.columnGap || railStyles.gap || "0");
    const amount = firstItem
      ? firstItem.getBoundingClientRect().width + gap
      : railRef.current.clientWidth * 0.9;
    railRef.current.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!railRef.current || (event.button !== undefined && event.button !== 0)) return;
    dragRef.current = {
      active: true,
      moved: false,
      scrollLeft: railRef.current.scrollLeft,
      startX: event.clientX,
    };
    railRef.current.classList.add("is-dragging");
    railRef.current.setPointerCapture?.(event.pointerId);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.active || !railRef.current) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 4) dragRef.current.moved = true;
    railRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
    if (dragRef.current.moved) event.preventDefault();
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!railRef.current) return;
    if (!dragRef.current.active) return;
    if (dragRef.current.moved) suppressClickRef.current = true;
    dragRef.current.active = false;
    railRef.current.classList.remove("is-dragging");
    try {
      railRef.current.releasePointerCapture?.(event.pointerId);
    } catch {}
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }

  function stopDragClick(event: MouseEvent<HTMLDivElement>) {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }

  return (
    <div className={cx("scroll-rail-shell", className)}>
      <button
        aria-label={`Previous ${label}`}
        className="rail-arrow rail-arrow-left"
        onClick={() => move(-1)}
        type="button"
      >
        <Icon name="chevronLeft" />
      </button>
      <div
        className="scroll-rail"
        onClickCapture={stopDragClick}
        onPointerCancel={endDrag}
        onPointerDown={startDrag}
        onPointerLeave={endDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        ref={railRef}
      >
        {children}
      </div>
      <button
        aria-label={`Next ${label}`}
        className="rail-arrow rail-arrow-right"
        onClick={() => move(1)}
        type="button"
      >
        <Icon name="chevronRight" />
      </button>
    </div>
  );
}
