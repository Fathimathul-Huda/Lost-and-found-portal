import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      
      <h1 className="title">About Us</h1>

      <div className="about-card">
        <img src="https://via.placeholder.com/700x350" alt="about" />
        <p>
          Traditional methods of reporting lost items were slow and complicated.
          With our portal, users can easily report, search and claim their lost
          belongings with a simple and secure system.
        </p>
      </div>

      <div className="quote-section">
        <blockquote>
          "Our goal is to make the process of finding lost items smooth and efficient."
        </blockquote>
        <h4>- The Lost and Found Team</h4>
      </div>

    </div>
  );
}
