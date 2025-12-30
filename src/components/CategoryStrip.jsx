import { categories } from "../data/products";

export default function CategoryStrip() {
  return (
    <div className="cat-strip-wrap" id="categories">
      <div className="cat-strip">
        {categories.map((c) => (
          <div className="cat" key={c.id}>
            <img src={c.icon} alt={c.name} />
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
