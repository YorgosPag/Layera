// Temporary fix for InfoPanel export issue - CommonJS format
const React = require('react');

// Simple InfoPanel component
const InfoPanel = ({ children, ...props }) => {
  return React.createElement('div', {
    style: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      maxWidth: '300px',
      zIndex: 10000
    },
    ...props
  }, children);
};

// Simple content provider
const StaticContentProvider = class {
  constructor(content = {}) {
    this.content = content;
  }

  async getContent(id, locale) {
    const contentData = this.content[id];
    if (!contentData) {
      return {
        id,
        title: 'Info',
        content: 'Content not found',
        category: 'general'
      };
    }
    return {
      id,
      title: contentData.title,
      content: contentData.content,
      category: contentData.category || "general"
    };
  }
};

// Simple content registry
const GEOALERT_INFO_CONTENT = {
  'category-selection': {
    title: 'Επιλογή Κατηγορίας',
    content: 'Επιλέξτε τον κλάδο που σας ενδιαφέρει',
    category: 'general'
  },
  'intent-selection': {
    title: 'Επιλογή Πρόθεσης',
    content: 'Επιλέξτε αν θέλετε να προσφέρετε ή να ζητήσετε',
    category: 'general'
  }
};

module.exports = {
  InfoPanel,
  StaticContentProvider,
  GEOALERT_INFO_CONTENT
};