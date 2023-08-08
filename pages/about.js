import React from "react";
import AboutBanner from "../components/AboutBanner";

const About = () => {
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two columns
    gridGap: "70px",
    marginLeft: "100px",
    marginRight: "0px",
  };

  const ourStoryStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#DE89A1",
  };

  const mainContentStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "30px",
  };

  const descriptionStyle = {
    fontFamily: "Inter, sans-serif",
  };

  const missionDescStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "20px",
  };

  const missionVisionStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "30px",
    color: "#DE89A1",
  };

  const ourTeamStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "30px",
    color: "#DE89A1",
    textAlign: "center",
  };

  const teamGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr", // Three columns
    gridTemplateRows: "1fr 1fr", // Two rows
    gridGap: "10px",
  };

  const teamImageStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "10px", // Adding rounded corners
    margin: "0 auto",
    display: "flex",
  };

  const teamStyle = {
    fontFamily: "Inter, sans-serif",
    textAlign: "center",
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AboutBanner imageUrl="/assets/images/aboutbanner.png" altText="Our Story Image" text="ABOUT US" description="Suds & Scents is a brand that specializes in personalized hygiene products. We offer a wide range of products all tailored to meet the unique needs and preferences of our customers." />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="grid-container" style={gridContainerStyle}>
        <div className="column1">
          <br />
          <div className="description" style={ourStoryStyle}>
            OUR STORY
          </div>
          <div className="description" style={mainContentStyle}>
            <br />
            At SUDS & SCENTS, we believe that everyone deserves to feel great in their own skin.
          </div>
          <div className="description" style={descriptionStyle}>
            <br />
            We also believe that true personalization is the key to achieving that feeling. That's why we created a brand that offers fully personalized hygiene products, including soap, shampoo, lotion, perfume, and more.
            <br /> <br />
            Our journey began with a simple idea: that personalization is the future of hygiene. We noticed that most hygiene products were one-size-fits-all, using generic formulas that didn't take into account each customer's unique needs and preferences. We saw an opportunity to change that, by offering a wide range of products that are customized to each customer's individual needs.
            <br /> <br />
            At SUDS & SCENTS, we're not just a brand, we're a community. We're here to help you discover your perfect routine, from scent to suds. We're passionate about empowering our customers to feel their best, and we're committed to providing the highest level of personalized care and attention.
          </div>
          <div className="image-column">
            <br /> <br /> <br /> <br />
            <img src="/assets/images/aboutpic2.png" height="350" width="600" />
          </div>
          <div className="description" style={missionVisionStyle}>
            <br /> <br />
            Our Vision
          </div>
          <div className="description" style={missionDescStyle}>
            <br />
            Our vision at Suds & Scents is to lead the personalized hygiene product industry by delivering exceptional quality, unmatched customization, and unwavering dedication to customer satisfaction. We aim to go beyond generic solutions and craft products that cater specifically to each individual's requirements, preferences, and lifestyle, inspiring self-expression, elevating daily routines, and nurturing well-being while promoting sustainability and ethical practices. Through continuous improvement, expert collaboration, and a deep understanding of our customers' needs, we seek to revolutionize personal hygiene and create a positive impact on individuals, communities, and the environment.
          </div>
        </div>
        <div className="image-column">
          <br />
          <img src="/assets/images/aboutpic1.png" alt="Our Story" height="600" width="470" />
          <div className="description" style={missionVisionStyle}>
            <br />
            Our Mission
          </div>
          <div className="description" style={missionDescStyle}>
            <br />
            At Suds & Scents, our mission is to redefine <br />
            personal hygiene by offering a truly personalized <br />
            experience. We strive to create high- quality, <br />
            customized hygiene products that cater to the <br />
            unique needs and preferences of each individual. <br />
            Through our commitment to excellence and <br />
            innovation, we aim to empower our customers to <br />
            embrace their individuality, enhance their self-care <br />
            routines, and feel confident in their own skin.
          </div>
          <div className="image-column">
            <br /> <br /> <br /> <br />
            <img src="/assets/images/aboutpic3.png" width="500" />
          </div>
        </div>
      </div>
      <div className="description" style={ourTeamStyle}>
        <br />
        Our Team
      </div>
      <div className="grid-container" style={teamGridStyle}>
        <div className="image-column">
          <br /> <br />
          <img src="/assets/images/bianca.png" alt="Team Member 1" style={teamImageStyle} />
          <div className="description" style={teamStyle}>
            <br />
            <b>Bianca Miña</b>
            <br />
            Development
          </div>
        </div>
        <div className="image-column">
          <br />
          <br />
          <img src="/assets/images/mark.png" alt="Team Member 2" style={teamImageStyle} />
          <div className="description" style={teamStyle}>
            <br />
            <b>Mark Ngo</b>
            <br />
            Development
          </div>
        </div>
        <div className="image-column">
          <br />
          <br />
          <img src="/assets/images/raven.jpg" alt="Team Member 3" style={teamImageStyle} />
          <div className="description" style={teamStyle}>
            <br />
            <b>Raven Uy</b>
            <br />
            Development
          </div>
        </div>
        <div className="image-column">
          <br />
          <br />
          <div className="description" style={teamStyle}>
            <br />
            <br />
          </div>
        </div>
        <div className="image-column">
          <br />
          <br />
          <img src="/assets/images/anna.jpg" alt="Team Member 3" style={teamImageStyle} />
          <div className="description" style={teamStyle}>
            <br />
            <b>Anna Valencia</b>
            <br />
            Documentation
          </div>
        </div>
        <div className="image-column">
          <br />
          <br />
          <div className="description" style={teamStyle}>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
