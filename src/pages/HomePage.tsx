import heroImage from "../assets/home_hero.png"

function HomePage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-3">Welcome to the Project Management Application</h1>
      <p className="lead">
        To create and manage your own projects, please register or log in to
        your account.
      </p>
      <img
        src={heroImage}
        alt="Project Management Hero"
        className="img-fluid mt-4"
      />
    </div>
  );
}

export default HomePage;
