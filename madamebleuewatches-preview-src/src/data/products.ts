export type Product = {
  slug: string;
  brand: string;
  model: string;
  image: string;
  images: string[];
  alt: string;
  description: string;
  availabilityLabel: string;
};

function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

export const products: Product[] = [
  {
    slug: "patek-philippe-5146j",
    brand: "Patek Philippe",
    model: "Annual Calendar 5146J-010",
    image: assetPath("images/products/patek-philippe-5146j/01.jpg"),
    images: [
      assetPath("images/products/patek-philippe-5146j/01.jpg"),
      assetPath("images/products/patek-philippe-5146j/2.jpg"),
      assetPath("images/products/patek-philippe-5146j/3.jpg"),
      assetPath("images/products/patek-philippe-5146j/4.jpg"),
      assetPath("images/products/patek-philippe-5146j/5.jpg"),
      assetPath("images/products/patek-philippe-5146j/6.jpg"),
      assetPath("images/products/patek-philippe-5146j/7.jpg"),
    ],
    alt: "Patek Philippe Annual Calendar 5146J-010 in yellow gold with dark dial",
    description: "An understated annual calendar selected as an example of quiet complication and classic elegance.",
    availabilityLabel: "Details discussed privately",
  },
  {
    slug: "rolex-gmt-master-ii",
    brand: "Rolex",
    model: "GMT-Master II Coke / Pepsi Selection",
    image: assetPath("images/products/rolex-gmt-master-ii/01.jpg"),
    images: [
      assetPath("images/products/rolex-gmt-master-ii/01.jpg"),
      assetPath("images/products/rolex-gmt-master-ii/2.jpg"),
      assetPath("images/products/rolex-gmt-master-ii/3.jpg"),
      assetPath("images/products/rolex-gmt-master-ii/4.jpg"),
      assetPath("images/products/rolex-gmt-master-ii/5.jpg"),
      assetPath("images/products/rolex-gmt-master-ii/6.jpg"),
    ],
    alt: "Rolex GMT-Master II selection photographed as a pre-owned collector reference",
    description: "Travel-focused references included as examples of collector-led private sourcing.",
    availabilityLabel: "Details discussed privately",
  },
  {
    slug: "panerai-tuttonero-pam01438",
    brand: "Panerai",
    model: "Tuttonero PAM01438",
    image: assetPath("images/products/panerai-tuttonero-pam01438/01.jpg"),
    images: [
      assetPath("images/products/panerai-tuttonero-pam01438/01.jpg"),
      assetPath("images/products/panerai-tuttonero-pam01438/2.jpg"),
      assetPath("images/products/panerai-tuttonero-pam01438/3.jpg"),
    ],
    alt: "Panerai Tuttonero PAM01438 black ceramic timepiece",
    description: "A monochrome ceramic presence with contemporary character and a discreet technical profile.",
    availabilityLabel: "Details discussed privately",
  },
  {
    slug: "cartier-santos-dumont-w2sa0011",
    brand: "Cartier",
    model: "Santos Dumont W2SA0011",
    image: assetPath("images/products/cartier-santos-dumont-w2sa0011/01.jpg"),
    images: [
      assetPath("images/products/cartier-santos-dumont-w2sa0011/01.jpg"),
      assetPath("images/products/cartier-santos-dumont-w2sa0011/2.jpg"),
      assetPath("images/products/cartier-santos-dumont-w2sa0011/3.jpg"),
    ],
    alt: "Cartier Santos Dumont W2SA0011 photographed as a private selection reference",
    description: "A slim, architectural dress reference selected for restraint, proportion and quiet elegance.",
    availabilityLabel: "Details discussed privately",
  },
];

export const featuredProduct = products[0];
