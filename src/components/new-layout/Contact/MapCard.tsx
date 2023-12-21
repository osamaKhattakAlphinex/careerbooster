const MapCard = () => {
  return (
    <div
      className="ratio ratio-16x9 rounded-4 overflow-hidden mt-18"
      data-aos="fade-up-sm"
      data-aos-delay="150"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.879118645787!2d-0.6267655235295658!3d51.51543367181503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487664d28ceac885%3A0x24eb7acf9f888c44!2sAtria!5e0!3m2!1sen!2s!4v1703152983049!5m2!1sen!2s"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapCard;
