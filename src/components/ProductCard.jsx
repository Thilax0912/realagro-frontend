import React from "react";
import { Link } from "react-router-dom"; // optional; remove if not routing

const ProductCard = ({ product }) => {
  // You can keep id or remove it later; this compiles either way
  const { id, title, desc, price, img } = product;

  return (
    <article className="card">
      <div className="card-media">
        <img src={img} alt={title} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
        <div className="price">{price}</div>

        <div className="card-actions">
          {/* If you don’t want routing, replace Link with a <button className="btn-ghost">Details</button> */}
          <Link to={id ? `/product/${id}` : "#"} className="btn-ghost">
            Details
          </Link>
          <button className="btn-buy">Buy</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
