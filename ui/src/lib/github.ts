import { PINNED_REPOSITORIES, PINNED_TOPICS } from '@/config/pinned-repos';
import moment from 'moment';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  isPinned?: boolean;
}

export interface GitHubStats {
  totalRepos: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { [key: string]: number };
  experienceMonths: number;
  experienceYears: number;
  firstCommitDate: string | null;
  lastCommitDate: string | null;
}

interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
}

interface GitHubTopicsResponse {
  names: string[];
}

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'arjun-computer-geek';
const EXPERIENCE_START_DATE = '2022-09-01'; // September 2023

export class GitHubService {
  private static async fetchWithRateLimit<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'arjun-portfolio'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching from GitHub API:', error);
      throw error;
    }
  }

  private static isPinnedRepository(repo: GitHubRepo): boolean {
    if (PINNED_REPOSITORIES.includes(repo.name)) {
      return true;
    }
    
    if (repo.topics && repo.topics.some(topic => PINNED_TOPICS.includes(topic))) {
      return true;
    }
    
    return false;
  }

  static async getUserRepos(username: string = USERNAME): Promise<GitHubRepo[]> {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`;
    const repos = await this.fetchWithRateLimit<GitHubApiRepo[]>(url);
    
    return repos
      .filter((repo: GitHubApiRepo) => !repo.fork && !repo.archived && !repo.private)
      .map((repo: GitHubApiRepo) => {
        const mappedRepo: GitHubRepo = {
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          topics: repo.topics || [],
          fork: repo.fork,
          archived: repo.archived,
          private: repo.private
        };
        
        mappedRepo.isPinned = this.isPinnedRepository(mappedRepo);
        
        return mappedRepo;
      });
  }

  static async getRepoTopics(username: string = USERNAME, repoName: string): Promise<string[]> {
    try {
      const url = `${GITHUB_API_BASE}/repos/${username}/${repoName}/topics`;
      const response = await this.fetchWithRateLimit<GitHubTopicsResponse>(url);
      return response.names || [];
    } catch (error) {
      console.error(`Error fetching topics for ${repoName}:`, error);
      return [];
    }
  }

  static calculateExperience(): { months: number; years: number } {
    const startDate = moment(EXPERIENCE_START_DATE);
    const currentDate = moment();
    
    const monthsDiff = currentDate.diff(startDate, 'months');
    
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    
    return { months: monthsDiff, years };
  }

  static async getGitHubStats(): Promise<GitHubStats> {
    const repos = await this.getUserRepos();
    
    // Calculate stats
    const totalRepos = repos.length;
    const publicRepos = repos.filter(repo => !repo.private).length;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Calculate top languages
    const languageCounts: { [key: string]: number } = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    
    // Sort languages by count
    const topLanguages = Object.fromEntries(
      Object.entries(languageCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
    );
    
    // Calculate experience
    const experience = this.calculateExperience();
    
    // Get commit dates
    const commitDates = repos
      .map(repo => moment(repo.pushed_at))
      .filter(date => date.isValid())
      .sort((a, b) => a.valueOf() - b.valueOf());
    
    const firstCommitDate = commitDates.length > 0 ? commitDates[0].toISOString() : null;
    const lastCommitDate = commitDates.length > 0 ? commitDates[commitDates.length - 1].toISOString() : null;
    
    return {
      totalRepos,
      publicRepos,
      totalStars,
      totalForks,
      topLanguages,
      experienceMonths: experience.months,
      experienceYears: experience.years,
      firstCommitDate,
      lastCommitDate
    };
  }

  static async getPinnedProjects(): Promise<GitHubRepo[]> {
    const repos = await this.getUserRepos();
    
    // Return only pinned repositories, sorted by stars and forks
    return repos
      .filter(repo => repo.isPinned)
      .sort((a, b) => {
        const aScore = (a.stargazers_count * 2) + a.forks_count;
        const bScore = (b.stargazers_count * 2) + b.forks_count;
        return bScore - aScore;
      });
  }

  static async getFeaturedProjects(): Promise<GitHubRepo[]> {
    const repos = await this.getUserRepos();
    
    // Filter and sort by stars, forks, and recency
    return repos
      .filter(repo => 
        repo.stargazers_count > 0 || 
        repo.forks_count > 0 || 
        repo.description?.length > 20
      )
      .sort((a, b) => {
        const aScore = (a.stargazers_count * 2) + a.forks_count + (a.description?.length || 0);
        const bScore = (b.stargazers_count * 2) + b.forks_count + (b.description?.length || 0);
        return bScore - aScore;
      })
      .slice(0, 6);
  }
} 