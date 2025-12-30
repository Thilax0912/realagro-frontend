import { NavLink } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <NavLink to="/" end>
        Home
      </NavLink>
      <a href="#categories">Categories</a>
      <a href="#featured">Featured</a>
      <a href="#contact">Contact</a>
    </div>
  );
}
