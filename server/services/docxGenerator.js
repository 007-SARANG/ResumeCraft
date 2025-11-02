const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } = require('docx');
const fs = require('fs');

class DOCXGenerator {
  async generateDOCX(data, template, outputPath) {
    try {
      const sections = [];

      // Header - Name and Contact
      sections.push(
        new Paragraph({
          text: data.name.toUpperCase(),
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 }
        })
      );

      // Contact Information
      const contactInfo = [];
      if (data.email) contactInfo.push(data.email);
      if (data.phone) contactInfo.push(data.phone);
      if (data.linkedin) contactInfo.push(data.linkedin);

      sections.push(
        new Paragraph({
          text: contactInfo.join(' | '),
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        })
      );

      // Professional Summary
      if (data.summary) {
        sections.push(this.createHeading('PROFESSIONAL SUMMARY'));
        sections.push(
          new Paragraph({
            text: data.summary,
            spacing: { after: 200 }
          })
        );
      }

      // Education
      if (data.education && data.education.length > 0) {
        sections.push(this.createHeading('EDUCATION'));
        data.education.forEach(edu => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: '\n' }),
                new TextRun({ text: edu.institution }),
                new TextRun({ text: '\n' }),
                new TextRun({ 
                  text: `${edu.duration}${edu.gpa ? ' | CGPA: ' + edu.gpa : ''}`,
                  italics: true
                })
              ],
              spacing: { after: 150 }
            })
          );
        });
      }

      // Skills
      if (data.skills) {
        sections.push(this.createHeading('TECHNICAL SKILLS'));
        
        if (data.skills.technical && data.skills.technical.length > 0) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: 'Technical: ', bold: true }),
                new TextRun({ text: data.skills.technical.join(', ') })
              ],
              spacing: { after: 100 }
            })
          );
        }
        
        if (data.skills.functional && data.skills.functional.length > 0) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: 'Functional: ', bold: true }),
                new TextRun({ text: data.skills.functional.join(', ') })
              ],
              spacing: { after: 200 }
            })
          );
        }
      }

      // Experience
      if (data.experience && data.experience.length > 0) {
        sections.push(this.createHeading('EXPERIENCE'));
        data.experience.forEach(exp => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.title, bold: true }),
                new TextRun({ text: ` | ${exp.company}` }),
                new TextRun({ text: '\n' }),
                new TextRun({ text: exp.duration, italics: true })
              ],
              spacing: { after: 100 }
            })
          );

          if (exp.bullets && exp.bullets.length > 0) {
            exp.bullets.forEach(bullet => {
              sections.push(
                new Paragraph({
                  text: `• ${bullet}`,
                  spacing: { after: 50 },
                  indent: { left: 720 }
                })
              );
            });
          }
          
          sections.push(new Paragraph({ text: '', spacing: { after: 150 } }));
        });
      }

      // Projects
      if (data.projects && data.projects.length > 0) {
        sections.push(this.createHeading('PROJECTS'));
        data.projects.forEach(project => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: project.name, bold: true }),
                new TextRun({ text: '\n' }),
                new TextRun({ 
                  text: project.technologies ? `Technologies: ${project.technologies.join(', ')}` : '',
                  italics: true
                })
              ],
              spacing: { after: 100 }
            })
          );

          if (project.bullets && project.bullets.length > 0) {
            project.bullets.forEach(bullet => {
              sections.push(
                new Paragraph({
                  text: `• ${bullet}`,
                  spacing: { after: 50 },
                  indent: { left: 720 }
                })
              );
            });
          }
          
          sections.push(new Paragraph({ text: '', spacing: { after: 150 } }));
        });
      }

      // Achievements
      if (data.achievements && data.achievements.length > 0) {
        sections.push(this.createHeading('ACHIEVEMENTS & LEADERSHIP'));
        data.achievements.forEach(achievement => {
          sections.push(
            new Paragraph({
              text: `• ${achievement}`,
              spacing: { after: 100 },
              indent: { left: 720 }
            })
          );
        });
      }

      // Create document
      const doc = new Document({
        sections: [{
          properties: {},
          children: sections
        }]
      });

      // Generate buffer and write to file
      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(outputPath, buffer);

      return outputPath;

    } catch (error) {
      console.error('Error generating DOCX:', error);
      throw error;
    }
  }

  createHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 150 },
      thematicBreak: true
    });
  }
}

module.exports = new DOCXGenerator();
