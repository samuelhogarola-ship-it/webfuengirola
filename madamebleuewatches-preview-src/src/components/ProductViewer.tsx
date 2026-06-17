import { useEffect, useState } from "react";
import type { Product } from "../data/products";

type ProductViewerProps = {
  product: Product | null;
  onClose: () => void;
  onDiscuss: () => void;
};

function previousIndex(current: number, total: number) {
  return current === 0 ? total - 1 : current - 1;
}

function nextIndex(current: number, total: number) {
  return current === total - 1 ? 0 : current + 1;
}

export function ProductViewer({ product, onClose, onDiscuss }: ProductViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const imageCount = product.images.length;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => previousIndex(current, imageCount));
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => nextIndex(current, imageCount));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, product]);

  if (!product) {
    return null;
  }

  const activeImage = product.images[activeIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="viewer-backdrop" role="dialog" aria-modal="true" aria-labelledby="viewer-title">
      <button type="button" className="viewer-scrim" aria-label="Close gallery" onClick={onClose} />

      <div className="viewer-panel">
        <div className="viewer-topbar">
          <span>
            {activeIndex + 1} / {product.images.length}
          </span>
          <button type="button" className="viewer-close" onClick={onClose} aria-label="Close gallery">
            Close
          </button>
        </div>

        <div className="viewer-media">
          <img src={activeImage} alt={`${product.brand} ${product.model} gallery image ${activeIndex + 1}`} />
          {hasMultipleImages ? (
            <>
              <button
                type="button"
                className="viewer-nav viewer-nav-prev"
                onClick={() => setActiveIndex((current) => previousIndex(current, product.images.length))}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5 8 12l7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="viewer-nav viewer-nav-next"
                onClick={() => setActiveIndex((current) => nextIndex(current, product.images.length))}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </>
          ) : null}
        </div>

        <div className="viewer-details">
          <div>
            <p className="viewer-brand">{product.brand}</p>
            <h2 id="viewer-title">{product.model}</h2>
            <p>{product.description}</p>
            <p>Details, condition and availability are handled privately.</p>
          </div>
          <button type="button" className="text-link" onClick={onDiscuss}>
            Discuss privately
          </button>
        </div>

        {hasMultipleImages ? (
          <div className="viewer-thumbnails" aria-label="Gallery thumbnails">
            {product.images.map((image, index) => (
              <button
                type="button"
                key={image}
                className={index === activeIndex ? "is-active" : undefined}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${product.images.length}`}
                aria-current={index === activeIndex}
              >
                <img src={image} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
