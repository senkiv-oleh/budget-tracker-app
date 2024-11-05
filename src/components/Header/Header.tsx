import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header__title">Personal Budget Tracker</h1>
        <p className="header__subtitle">
          Track your expenses and manage your budget effectively
        </p>
      </div>
    </header>
  );
};
