import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
  onOpen: (product: Product) => void;
};

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <article className="selection-card">
      <button
        type="button"
        className="product-card-button"
        onClick={() => onOpen(product)}
        aria-label={`Open private gallery for ${product.brand} ${product.model}`}
      >
        <img src={product.image} alt={product.alt} />
        <span className="card-gradient" aria-hidden="true" />
        <span className="card-blur" aria-hidden="true" />
        <span className="card-overlay">
          <span className="card-brand">{product.brand}</span>
          <span className="card-title">{product.model}</span>
          <span className="card-description">{product.description}</span>
          <span className="card-action">View private gallery</span>
        </span>
      </button>
    </article>
  );
}
