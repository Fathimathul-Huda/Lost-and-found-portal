import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      
      <h1 className="title">About Us</h1>

      <div className="about-card">
        <p>
          Losing valuable belongings can be stressful and frustrating. Traditional
          reporting systems are often slow, unorganized, and unreliable — making
          it difficult for people to recover what truly matters to them. 
          Our Lost & Found Portal is built with a clear mission: to connect people
          who have lost items with those who have found them — quickly, securely,
          and efficiently. Users can report lost or found items, upload images,
          add detailed descriptions, and track claim status in real time. 
          We believe that technology should make life easier. By creating a safe
          and trusted digital space for reporting and verification, we ensure that
          every lost item has a better chance of getting back home. Whether it’s a
          phone, wallet, document, pet, or any personal belonging — every item
          matters.
        </p>
       
      
      </div>

      <div className="quote-section">
        <blockquote>
          "Our goal is to make the process of finding lost items smooth,
          secure, and efficient — because every belonging has a story."
        </blockquote>
        <h4>- The Lost and Found Team</h4>
      </div>
    </div>
  );
}
