import "../styles/Title.css";

export default function Title({ children, level = 1, centered = true }) {
  const Tag = `h${level}`; // Gera h1, h2, etc dinamicamente
  return (
    <div className={`title-container ${centered ? "centered" : ""}`}>
      <Tag className="title-text">{children}</Tag>
    </div>
  );
}
