const Landing = () => {
  return (
    <>
      <div className="h-screen w-screen bg-[var(--bg-color)] font-primary">
        <header className="sticky top-0 z-50 p-4">
          <div className="header-content flex items-center justify-between">
            <div className="title">
              <p className="text-primary-700 font-extrabold text-3xl tracking-wide">
                WhileTrue:
              </p>
            </div>
            <div className="login-btn">Login</div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Landing;
