import { useQuery } from '@tanstack/react-query';
import { GitHubService, GitHubStats, GitHubRepo } from '@/lib/github';

export const useGitHubStats = () => {
  return useQuery({
    queryKey: ['github-stats'],
    queryFn: () => GitHubService.getGitHubStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useGitHubRepos = () => {
  return useQuery({
    queryKey: ['github-repos'],
    queryFn: () => GitHubService.getUserRepos(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => GitHubService.getFeaturedProjects(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const usePinnedProjects = () => {
  return useQuery({
    queryKey: ['pinned-projects'],
    queryFn: () => GitHubService.getPinnedProjects(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: () => GitHubService.calculateExperience(),
    staleTime: 1000 * 60 * 60, // 1 hour (experience doesn't change frequently)
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}; 