import React from "react";
import ImageBanner from "../components/ImageBanner";

const Contact = () => {
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr", // Three columns
    gridGap: "50px",
    marginLeft: "90px",
  };

  const headingStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  };

  const connectStyle = {
    ...headingStyle,
    color: "#DE89A1",
    fontSize: "20px",
  };

  const descriptionStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: "normal",
  };

  const titleStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "25px",
    color: "#27272A",
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
      <ImageBanner imageUrl="/assets/images/contactbanner.png" altText="Contact Banner" text="CONTACT US" description="We value your feedback, inquiries, and suggestions. Whether you have a question, need assistance, or simply want to get in touch with us, this is the place to do it." />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="grid-container" style={gridContainerStyle}>
        <div className="description" style={connectStyle}>
          CONNECT WITH US!
          <br /> <br />
          <div className="description" style={titleStyle}>
            Don't hesitate to contact us if you need more help!
          </div>
        </div>
        <div className="our-location" style={headingStyle}>
          <br /> <br />
          Our Location
          <div className="our-location-description" style={descriptionStyle}>
            1234 Muralla St., Intramuros, Manila <br />
            <b>OPEN:</b> Mon-Fri 8:00AM - 5:00PM
          </div>
        </div>
        <div className="contact" style={headingStyle}>
          <br /> <br />
          Contact
          <div className="description" style={descriptionStyle}>
            sudsandscents@gmail.com <br />+ 1 (234) 567 890
          </div>
        </div>
        <div className="description" style={descriptionStyle}>
          If you find yourself in need of further assistance, don't hesitate to reach out to us! Our team of experts is always ready to lend a helping hand and address any additional questions or concerns you may have.
        </div>
        <div className="contact" style={headingStyle}>
          Facebook
          <div className="description" style={descriptionStyle}>
            SUDS & SCENTS <br />
            facebook.com/sudsandscents
          </div>
        </div>
        <div className="contact" style={headingStyle}>
          Instagram
          <div className="description" style={descriptionStyle}>
            SUDS & SCENTS (@sudsandscents) <br />
            instagram.com/sudsandscents
          </div>
        </div>
      </div>
      <form>{/* Your form content */}</form>
    </div>
  );
};

export default Contact;
