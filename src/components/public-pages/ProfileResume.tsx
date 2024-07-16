import React, { useEffect } from "react";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
// Font.register("Arial")
// Create styles
const styles = StyleSheet.create({
  page: {
    // fontFamily: ,
    fontSize: 12,
    padding: 20,
    backgroundColor: "#f4f4f4",
    color: "#333",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#333",
    margin: 0,
  },
  ul: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    width: "100%",
  },
  li: {
    width: "23%",
    display: "flex",
    flexDirection: "row",
    gap: "4px",
  },
  section: {
    marginBottom: 20,
  },
  skillSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    flexWrap: "wrap",
  },

  sectionTitle: {
    textTransform: "uppercase",
    fontSize: 18,
    marginBottom: "10px",
    borderBottom: "2px solid #333",
    paddingBottom: 5,
    marginTop: 20,
  },
  jobTitle: {
    fontSize: 16,
    color: "#333",
  },
  expDate: {
    marginBottom: "10px",
  },
  expDesc: {
    marginBottom: "10px",
  },
});

function ProfileResume({ userData }) {
  console.log(userData);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {userData.firstName + " " + userData.lastName}
          </Text>
          <Text>{userData?.experience?.[0]?.jobTitle}</Text>

          <Text style={styles.ul}>
            <Text style={styles.li}>
              contact: <Text>{userData.phone}</Text> |
            </Text>
            <Text style={styles.li}>
              Email: <Text> {userData.email}</Text> |
            </Text>
            <Text style={styles.li}>
              Address:{" "}
              <Text>
                {userData.contact.cityState +
                  " " +
                  userData.contact?.street +
                  " " +
                  userData.contact?.postalCode +
                  " " +
                  userData.contact.country}
              </Text>{" "}
              |
            </Text>
            <Text style={styles.li}>
              LinkedIn: <Text>{userData.linkedin}</Text>{" "}
            </Text>
          </Text>
        </View>
        {/* <View style={styles.section}>
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
        </View> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillSection}>
            {userData.skills.map((skill) => {
              return <Text>• {skill}</Text>;
            })}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View>
            {userData.experience.map((experience) => {
              return (
                <>
                  {" "}
                  <Text style={styles.jobTitle}>
                    {experience.jobTitle} |{" "}
                    {experience.company + ", " + experience.cityState}
                  </Text>
                  <Text style={styles.expDate}>
                    <Text>{experience.fromMonth}</Text>
                    <Text> {experience.fromYear}</Text> -
                    {experience.isContinue && <Text>&nbsp;Present</Text>}
                    <Text> {experience.toMonth}</Text>
                    <Text> {experience.toYear}</Text>
                  </Text>
                  <Text style={styles.expDesc}>{experience.description}</Text>
                </>
              );
            })}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View>
            {userData.education.map((education) => {
              return (
                <>
                  {" "}
                  <Text style={styles.jobTitle}>
                    {education.educationLevel + " In " + education.fieldOfStudy}{" "}
                  </Text>
                  <Text>
                    {education.schoolName + ", " + education.schoolLocation}{" "}
                  </Text>
                  <Text style={styles.expDate}>
                    <Text>{education.fromMonth}</Text>
                    <Text> {education.fromYear}</Text> -
                    {education.isContinue && <Text>&nbsp;Present</Text>}
                    <Text> {education.toMonth}</Text>
                    <Text> {education.toYear}</Text>
                  </Text>
                  {/* <Text style={styles.expDesc}>{education.description}</Text> */}
                </>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ProfileResume;
