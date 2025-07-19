// GitHub API helper for CMS operations

interface CMSConfig {
  site: {
    name: string;
    description: string;
  };
  sections: Array<{
    id: string;
    title: string;
    description?: string;
    fields: Array<{
      id: string;
      label: string;
      type: string;
      helpText?: string;
      defaultValue?: string;
    }>;
  }>;
}

export class GitHubCMS {
  private token: string;
  private headers: HeadersInit;

  constructor(token: string) {
    this.token = token;
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
  }

  // Extract owner and repo from GitHub URL
  private parseGitHubUrl(url: string): { owner: string; repo: string } {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');
    return { owner: match[1], repo: match[2].replace('.git', '') };
  }

  // Get CMS configuration from repository
  async getCMSConfig(repoUrl: string): Promise<CMSConfig> {
    const { owner, repo } = this.parseGitHubUrl(repoUrl);
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/cms.config.json`;
    
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) throw new Error('Failed to fetch CMS config');
    
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  }

  // Get current content from repository
  async getContent(repoUrl: string, path: string = 'src/content/site-content.json'): Promise<{ content: Record<string, unknown>; sha: string }> {
    const { owner, repo } = this.parseGitHubUrl(repoUrl);
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) throw new Error('Failed to fetch content');
    
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return {
      content: JSON.parse(content),
      sha: data.sha
    };
  }

  // Update content in repository
  async updateContent(repoUrl: string, content: Record<string, unknown>, sha: string, message: string = 'Update content via CMS'): Promise<void> {
    const { owner, repo } = this.parseGitHubUrl(repoUrl);
    const path = 'src/content/site-content.json';
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const body = {
      message,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
      sha,
    };
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update content: ${error.message}`);
    }
  }

  // Check if repository exists and is accessible
  async validateRepository(repoUrl: string): Promise<boolean> {
    try {
      const { owner, repo } = this.parseGitHubUrl(repoUrl);
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      
      const response = await fetch(url, { headers: this.headers });
      return response.ok;
    } catch {
      return false;
    }
  }
}