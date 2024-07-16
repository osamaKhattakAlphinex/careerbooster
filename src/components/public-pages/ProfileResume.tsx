import React from "react";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Arial",
    fontSize: 12,
    padding: 20,
    backgroundColor: "#f4f4f4",
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#333",
    margin: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    textTransform: "uppercase",
    fontSize: 18,
    marginBottom: 10,
    borderBottom: "2px solid #333",
    paddingBottom: 5,
    marginTop: 20,
  },
  jobTitle: {
    fontSize: 16,
    color: "#333",
  },
});

function ProfileResume() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>M. OSAMA AHMAD</Text>
          <Text>
            Delivering Excellence through Advanced Front-End Development
          </Text>
          <Text>
            Contact: 03175216348 | Email: osamahkhalifa126@gmail.com | Address:
            House 297 Street 61 G-13 Islamabad Pakistan 44000
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text>
            Energetic and dedicated React/Next.js Developer with expertise in
            creating robust web interfaces and maintaining reusable code at
            CareerBooster.ae. Skilled in front-end development, HTML, CSS, and
            Bootstrap, while also proficient in SEO, with a deep understanding
            of optimization strategies and techniques. Worked closely with
            developers, designers, and clients to ensure high-quality technical
            results that align with client goals and user experience. Interests
            lie in web development and the highly scalable application of my
            technical expertise and versatile skill set towards achieving
            outstanding results in web development and design.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View>
            <Text>• WordPress</Text>
            <Text>• HTML/CSS</Text>
            <Text>• Responsive Design</Text>
            <Text>• User Interface (UI) Design</Text>
            <Text>• Cross-Browser Compatibility</Text>
            <Text>• Image Optimization</Text>
            <Text>• Reusable Code</Text>
            <Text>• Mongo DB</Text>
            <Text>• PSD to HTML</Text>
            <Text>• Figma to HTML</Text>
            <Text>• Tailwind CSS</Text>
            <Text>• Bootstrap</Text>
            <Text>• CSS</Text>
            <Text>• Pixel Perfect Design</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View>
            <Text style={styles.jobTitle}>
              React/Next Js Developer | careerBooster.ae | October 2022 -
              Present
            </Text>
            <Text>
              React/Next.js Development: Played a crucial role in the creation
              of careerBooster.ae's visually appealing and user-friendly web
              applications using React and Next.js.
              <br />
              Code Resusability: Implemented efficient coding practices to
              enhance the reusability of code components, improving overall
              development productivity.
            </Text>
          </View>
          <View>
            <Text style={styles.jobTitle}>
              SEO Expert | Nasuat Technologies | January 2021 - September 2022
            </Text>
            <Text>
              Client Engagement: Successfully achieved top-ranking results for
              client websites by implementing effective SEO strategies and
              optimization techniques.
              <br />
              On-Page and Off-Page SEO: Demonstrated a strong understanding of
              both on-page and off-page SEO factors, optimizing website content
              for better search engine rankings.
              <br />
              Performance Monitoring: Regularly monitored and reported on SEO
              performance, providing clients with regular updates on SEO
              improvements and offering tailored solutions to improve their
              online visibility.
            </Text>
          </View>
          <View>
            <Text style={styles.jobTitle}>
              WordPress Developer | ilmabad.net | February 2021 - April 2021
            </Text>
            <Text>
              WordPress Development: Spearheaded the development of key
              projects, including "Coderomagno.com," resulting in a 2.5%
              increase in user engagement and 3.4% growth in site traffic.
              <br />
              Custom Theme Creation: Designed and implemented custom WordPress
              themes tailored to client needs, enhancing the overall user
              experience.
              <br />
              SEO Optimization: Ensured on-page SEO optimization, leading to a
              remarkable 50% boost in search engine rankings for client websites
              and driving higher organic traffic and conversions.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ProfileResume;
