const PDFDocument = require('pdfkit');
const fs = require('fs');

class PDFGenerator {
  async generatePDF(data, template, outputPath) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ 
          size: 'LETTER',
          margins: { top: 50, bottom: 50, left: 50, right: 50 }
        });

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Apply template-specific styling
        const colors = this.getTemplateColors(template);

        // Header Section
        this.addHeader(doc, data, colors);

        // Professional Summary
        if (data.summary) {
          this.addSection(doc, 'PROFESSIONAL SUMMARY', colors);
          doc.fontSize(10)
             .fillColor('#333333')
             .text(data.summary, { align: 'justify' });
          doc.moveDown(0.8);
        }

        // Education
        if (data.education && data.education.length > 0) {
          this.addSection(doc, 'EDUCATION', colors);
          data.education.forEach(edu => {
            doc.fontSize(11)
               .fillColor('#000000')
               .font('Helvetica-Bold')
               .text(edu.degree, { continued: false });
            
            doc.fontSize(10)
               .font('Helvetica')
               .fillColor('#555555')
               .text(edu.institution);
            
            doc.fontSize(9)
               .fillColor('#666666')
               .text(`${edu.duration}${edu.gpa ? ' | CGPA: ' + edu.gpa : ''}`);
            
            doc.moveDown(0.5);
          });
          doc.moveDown(0.3);
        }

        // Skills
        if (data.skills) {
          this.addSection(doc, 'TECHNICAL SKILLS', colors);
          
          if (data.skills.technical && data.skills.technical.length > 0) {
            doc.fontSize(10)
               .fillColor('#333333')
               .font('Helvetica')
               .text(`Technical: ${data.skills.technical.join(', ')}`, { 
                 align: 'left',
                 indent: 0
               });
            doc.moveDown(0.3);
          }
          
          if (data.skills.functional && data.skills.functional.length > 0) {
            doc.fontSize(10)
               .fillColor('#333333')
               .text(`Functional: ${data.skills.functional.join(', ')}`, { 
                 align: 'left'
               });
          }
          doc.moveDown(0.8);
        }

        // Experience
        if (data.experience && data.experience.length > 0) {
          this.addSection(doc, 'EXPERIENCE', colors);
          data.experience.forEach((exp, index) => {
            doc.fontSize(11)
               .fillColor('#000000')
               .font('Helvetica-Bold')
               .text(exp.title, { continued: true })
               .font('Helvetica')
               .fillColor('#555555')
               .text(` | ${exp.company}`);
            
            doc.fontSize(9)
               .fillColor('#666666')
               .text(exp.duration);
            
            doc.moveDown(0.3);
            
            if (exp.bullets && exp.bullets.length > 0) {
              exp.bullets.forEach(bullet => {
                doc.fontSize(10)
                   .fillColor('#333333')
                   .list([bullet], {
                     bulletRadius: 2,
                     indent: 20
                   });
              });
            }
            
            if (index < data.experience.length - 1) {
              doc.moveDown(0.5);
            }
          });
          doc.moveDown(0.8);
        }

        // Projects
        if (data.projects && data.projects.length > 0) {
          this.addSection(doc, 'PROJECTS', colors);
          data.projects.forEach((project, index) => {
            doc.fontSize(11)
               .fillColor('#000000')
               .font('Helvetica-Bold')
               .text(project.name);
            
            if (project.technologies && project.technologies.length > 0) {
              doc.fontSize(9)
                 .font('Helvetica-Oblique')
                 .fillColor('#666666')
                 .text(`Technologies: ${project.technologies.join(', ')}`);
            }
            
            doc.moveDown(0.3);
            
            if (project.bullets && project.bullets.length > 0) {
              project.bullets.forEach(bullet => {
                doc.fontSize(10)
                   .font('Helvetica')
                   .fillColor('#333333')
                   .list([bullet], {
                     bulletRadius: 2,
                     indent: 20
                   });
              });
            }
            
            if (index < data.projects.length - 1) {
              doc.moveDown(0.5);
            }
          });
          doc.moveDown(0.8);
        }

        // Achievements
        if (data.achievements && data.achievements.length > 0) {
          this.addSection(doc, 'ACHIEVEMENTS & LEADERSHIP', colors);
          data.achievements.forEach(achievement => {
            doc.fontSize(10)
               .fillColor('#333333')
               .font('Helvetica')
               .list([achievement], {
                 bulletRadius: 2,
                 indent: 20
               });
          });
        }

        doc.end();

        stream.on('finish', () => {
          resolve(outputPath);
        });

        stream.on('error', (err) => {
          reject(err);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  addHeader(doc, data, colors) {
    // Name
    doc.fontSize(20)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text(data.name.toUpperCase(), { align: 'center' });

    doc.moveDown(0.3);

    // Contact Information
    const contactInfo = [];
    if (data.email) contactInfo.push(data.email);
    if (data.phone) contactInfo.push(data.phone);
    if (data.linkedin) contactInfo.push(data.linkedin);

    doc.fontSize(10)
       .fillColor('#555555')
       .font('Helvetica')
       .text(contactInfo.join(' | '), { align: 'center' });

    doc.moveDown(1);

    // Horizontal line
    doc.strokeColor(colors.accent)
       .lineWidth(2)
       .moveTo(50, doc.y)
       .lineTo(562, doc.y)
       .stroke();

    doc.moveDown(0.8);
  }

  addSection(doc, title, colors) {
    doc.fontSize(12)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text(title);

    doc.moveDown(0.5);
  }

  getTemplateColors(template) {
    const templates = {
      classic: {
        primary: '#000000',      // Pure black
        accent: '#000000',       // Black underline
        text: '#000000'          // Black text
      },
      modern: {
        primary: '#1E3A8A',      // Royal blue
        accent: '#3B82F6',       // Bright blue
        text: '#1F2937'          // Dark gray
      },
      minimal: {
        primary: '#374151',      // Medium gray
        accent: '#9CA3AF',       // Light gray
        text: '#4B5563'          // Gray text
      }
    };

    return templates[template] || templates.modern;
  }
}

module.exports = new PDFGenerator();
