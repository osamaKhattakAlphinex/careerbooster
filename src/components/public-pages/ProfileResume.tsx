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
              <Text>{userData.phone}</Text> |&nbsp;
            </Text>
            <Text style={styles.li}>
              <Text> {userData.email}</Text> |&nbsp;
            </Text>
            <Text style={styles.li}>
              <Text>
                {userData.contact.cityState +
                  " " +
                  userData.contact?.street +
                  " " +
                  userData.contact?.postalCode +
                  " " +
                  userData.contact.country}
              </Text>{" "}
              |&nbsp;
            </Text>
            <Text style={styles.li}>
              <Text>{userData.linkedin}</Text>{" "}
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.expDesc}>{userData.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillSection}>
            {userData.skills.map((skill, index) => {
              return <Text key={index}>• {skill}</Text>;
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
