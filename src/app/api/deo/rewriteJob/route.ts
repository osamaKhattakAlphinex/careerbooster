import { makeTrainedBotEntry } from "@/helpers/makeTrainBotEntry";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = body.content.substring(0, 12000);
    if (content) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "",
      });
      const input = `This is the job description: ${content}
              
              Rewrite and proofread it, also try to keep it in format so that it can look professional.
  
              Also give me top 20 skills that are related to this job from this list of skills.
              [
              // Software Development
              "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Swift", "Kotlin", "HTML", "CSS", 
              "React", "Next.js", "Nest.js", "Angular", "Vue.js", "Node.js", "Django", "Flask", "Spring", "ASP.NET", "MySQL", 
              "PostgreSQL", "MongoDB", "SQLite", "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", 
              "Machine Learning", "Data Science", "Artificial Intelligence", "DevOps", "Blockchain", 
              "Cybersecurity", "SQL", "R", "Excel", "Tableau", "Power BI", "SAS", "SPSS", "Matlab", 
              "Data Visualization", "Data Cleaning", "Statistical Analysis", "Predictive Modeling", "Big Data",
            
              // Data Analysis
              "Data Mining", "Data Warehousing", "ETL", "Business Intelligence", "Data Governance", 
              "Data Architecture", "Data Modeling", "Predictive Analytics", "Machine Learning", "Deep Learning", 
              "Neural Networks", "Natural Language Processing", "Image Processing", "Computer Vision",
            
              // Design
              "Adobe Photoshop", "Adobe Illustrator", "Sketch", "Figma", "Adobe XD", "UI/UX Design", 
              "Graphic Design", "Web Design", "Product Design", "3D Modeling", "Animation", "Prototyping", 
              "Wireframing", "Design Thinking", "User Research", "Usability Testing", "Interaction Design",
            
              // Marketing
              "SEO", "Content Marketing", "Social Media Marketing", "Email Marketing", "Google Analytics", 
              "Google Ads", "Facebook Ads", "Copywriting", "Public Relations", "Market Research", 
              "Brand Management", "Digital Marketing", "Affiliate Marketing", "Marketing Strategy", 
              "Customer Acquisition", "Customer Retention", "Campaign Management", "Influencer Marketing",
            
              // Finance
              "Accounting", "Financial Analysis", "Financial Modeling", "Excel", "QuickBooks", "SAP", 
              "Oracle", "Budgeting", "Forecasting", "Investment Analysis", "Risk Management", "Taxation", 
              "Auditing", "Financial Reporting", "Cash Flow Management", "Corporate Finance", 
              "Financial Planning", "Wealth Management", "Compliance",
            
              // Management
              "Project Management", "Agile", "Scrum", "Leadership", "Team Management", "Strategic Planning", 
              "Business Development", "Operations Management", "Change Management", "Performance Management", 
              "Supply Chain Management", "Logistics", "Procurement", "Inventory Management", 
              "Contract Management", "Quality Assurance", "Lean Manufacturing", "Six Sigma",
            
              // Healthcare
              "Patient Care", "Medical Coding", "Nursing", "Pharmacy", "Medical Research", 
              "Healthcare Administration", "Clinical Trials", "Public Health", "EHR/EMR", "Medical Billing", 
              "Radiology", "Laboratory Skills", "Healthcare Compliance", "Patient Education", 
              "Medical Imaging", "Telemedicine", "Surgical Assistance", "Rehabilitation", "Mental Health",
            
              // Education
              "Curriculum Development", "Lesson Planning", "Classroom Management", "Educational Technology", 
              "Special Education", "Tutoring", "ESL", "Assessment", "Instructional Design", "Educational Leadership", 
              "Student Counseling", "Early Childhood Education", "Higher Education", "STEM Education", 
              "Online Teaching", "Academic Writing", "Research Methods", "Learning Management Systems",
            
              // Sales
              "Sales Strategy", "Business Development", "Account Management", "Customer Relationship Management (CRM)", 
              "Lead Generation", "Negotiation", "Sales Presentations", "Cold Calling", "Inside Sales", 
              "Outside Sales", "Territory Management", "Sales Forecasting", "Pipeline Management", 
              "Retail Sales", "B2B Sales", "B2C Sales", "Channel Sales", "Sales Operations", "Customer Service",
            
              // Human Resources
              "Recruiting", "Talent Acquisition", "Employee Relations", "Onboarding", "HRIS", 
              "Compensation and Benefits", "Payroll", "Training and Development", "Performance Management", 
              "Employee Engagement", "Succession Planning", "Labor Law", "Conflict Resolution", 
              "Organizational Development", "Diversity and Inclusion",
            
              // Other Skills
              "Communication", "Problem Solving", "Critical Thinking", "Time Management", "Teamwork", 
              "Adaptability", "Creativity", "Negotiation", "Networking", "Customer Service", "Sales", 
              "Training", "Coaching", "Research", "Technical Writing", "Public Speaking", "Data Entry", 
              "Multitasking", "Event Planning", "Project Coordination", "Process Improvement"
            ]
              The output must be in json format. (following is an example)
          {
            jobDescription: "VALUE_HERE",
            skills: []
          }
          jobDescription must be in proper html format.
          `;

      const response: any = await openai.chat.completions.create({
        // model: "ft:gpt-3.5-turbo-1106:careerbooster::9SLbRnyu",
        model: "gpt-4-1106-preview",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: input }],
      });
      try {
        const obj: any = {
          type: "deo.rewriteJob",
          input: input,
          output: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          idealOutput: "",
          status: "pending",
          userEmail: "DEO",
          Instructions: `Write about for consultant using his/her resume`,
        };
        await makeTrainedBotEntry(obj);
      } catch (error) {}

      return NextResponse.json(
        { success: true, result: response.choices[0].message.content },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
