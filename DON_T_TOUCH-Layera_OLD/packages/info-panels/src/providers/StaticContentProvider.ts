/**
 * StaticContentProvider - Default implementation για static content
 *
 * Αυτό είναι το fallback provider που χρησιμοποιεί hardcoded content.
 * Μπορεί να αντικατασταθεί από CMS provider, API provider, κλπ.
 */

import type { InfoPanelContentProvider, InfoPanelContent, InfoPanelId } from '../types';

export interface StaticContentConfig {
  [key: InfoPanelId]: {
    title: string;
    content: string;
    category?: string;
    metadata?: Record<string, unknown>;
  };
}

export class StaticContentProvider implements InfoPanelContentProvider {
  private content: StaticContentConfig;

  constructor(content: StaticContentConfig = {}) {
    this.content = content;
  }

  async getContent(id: InfoPanelId, locale?: string): Promise<InfoPanelContent> {
    const contentData = this.content[id];

    if (!contentData) {
      throw new Error(`Info panel content not found for id: ${id}`);
    }

    return {
      id,
      title: contentData.title,
      content: contentData.content,
      category: contentData.category || 'general',
      metadata: {
        ...contentData.metadata,
        locale,
        provider: 'static'
      }
    };
  }

  hasContent(id: InfoPanelId): boolean {
    return id in this.content;
  }

  // Utility methods για dynamic content management
  addContent(id: InfoPanelId, content: StaticContentConfig[string]): void {
    this.content[id] = content;
  }

  removeContent(id: InfoPanelId): void {
    delete this.content[id];
  }

  updateContent(id: InfoPanelId, content: Partial<StaticContentConfig[string]>): void {
    if (this.content[id]) {
      this.content[id] = { ...this.content[id], ...content };
    }
  }

  getAllIds(): InfoPanelId[] {
    return Object.keys(this.content);
  }

  getContentByCategory(category: string): InfoPanelContent[] {
    return Object.entries(this.content)
      .filter(([, data]) => data.category === category)
      .map(([id, data]) => ({
        id,
        title: data.title,
        content: data.content,
        category: data.category || 'general',
        metadata: data.metadata || {}
      }));
  }
}