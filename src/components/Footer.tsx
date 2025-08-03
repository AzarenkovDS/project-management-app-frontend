function Footer() {
  return (
    <footer className="bg-body-tertiary text-center py-3 border-top">
      <div className="container">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Final project by Dmytro Azarenkov |
          With thanks to the instructors at Per Scholas
        </small>
      </div>
    </footer>
  );
}

export default Footer;
