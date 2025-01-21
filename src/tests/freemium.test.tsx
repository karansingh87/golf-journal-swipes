import { render, screen, fireEvent, act } from '@testing-library/react';
import { supabase } from "@/integrations/supabase/client";
import { useProfileData } from "@/components/recorder/hooks/useProfileData";
import { canUseFeature, incrementUsage } from "@/utils/subscription";
import VoiceRecorderContainer from '@/components/VoiceRecorderContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the necessary modules and hooks
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      update: jest.fn(),
    })),
  },
}));

jest.mock('@/components/recorder/hooks/useProfileData');
jest.mock('@/utils/subscription');

describe('Freemium Experience Tests', () => {
  const queryClient = new QueryClient();
  
  // Helper function to setup test environment
  const setupTest = (profileData: any) => {
    (useProfileData as jest.Mock).mockReturnValue({
      profile: profileData,
      isProfileLoading: false,
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <VoiceRecorderContainer />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Scenario 1: New User Sign Up', () => {
    it('should initialize with correct default values', async () => {
      const newUserProfile = {
        id: 'test-user-id',
        has_pro_access: false,
        monthly_recordings_count: 0,
        monthly_pep_talks_count: 0,
        monthly_coach_notes_count: 0,
        last_reset_date: new Date().toISOString(),
      };

      setupTest(newUserProfile);

      expect(useProfileData).toHaveBeenCalled();
      const profile = (useProfileData as jest.Mock).mock.results[0].value.profile;
      expect(profile.monthly_recordings_count).toBe(0);
      expect(profile.monthly_pep_talks_count).toBe(0);
      expect(profile.monthly_coach_notes_count).toBe(0);
      expect(profile.has_pro_access).toBe(false);
    });
  });

  describe('Scenario 2: Free Usage Limits', () => {
    it('should track usage and show upgrade modal when limit reached', async () => {
      const mockCanUseFeature = canUseFeature as jest.Mock;
      const mockIncrementUsage = incrementUsage as jest.Mock;

      // Test first recording (should succeed)
      mockCanUseFeature.mockResolvedValueOnce(true);
      const profile = {
        id: 'test-user-id',
        has_pro_access: false,
        monthly_recordings_count: 0,
      };

      setupTest(profile);
      
      // Simulate recording attempts
      for (let i = 0; i < 4; i++) {
        mockCanUseFeature.mockResolvedValueOnce(i < 3);
        
        await act(async () => {
          const recordButton = screen.getByRole('button', { name: /start recording/i });
          fireEvent.click(recordButton);
        });

        if (i < 3) {
          expect(mockIncrementUsage).toHaveBeenCalled();
          expect(screen.queryByText(/upgrade required/i)).not.toBeInTheDocument();
        } else {
          expect(screen.getByText(/upgrade required/i)).toBeInTheDocument();
        }
      }
    });
  });

  describe('Scenario 3: Monthly Reset', () => {
    it('should reset counts when last_reset_date is old', async () => {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      const profile = {
        id: 'test-user-id',
        has_pro_access: false,
        monthly_recordings_count: 3,
        monthly_pep_talks_count: 1,
        monthly_coach_notes_count: 1,
        last_reset_date: twoMonthsAgo.toISOString(),
      };

      setupTest(profile);

      const mockUpdate = supabase.from('profiles').update as jest.Mock;
      
      await act(async () => {
        const recordButton = screen.getByRole('button', { name: /start recording/i });
        fireEvent.click(recordButton);
      });

      expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
        monthly_recordings_count: 0,
        monthly_pep_talks_count: 0,
        monthly_coach_notes_count: 0,
        last_reset_date: expect.any(String),
      }));
    });
  });

  describe('Scenario 4: Pro User Experience', () => {
    it('should not track or limit usage for pro users', async () => {
      const mockCanUseFeature = canUseFeature as jest.Mock;
      const mockIncrementUsage = incrementUsage as jest.Mock;

      const proProfile = {
        id: 'test-user-id',
        has_pro_access: true,
        monthly_recordings_count: 0,
      };

      setupTest(proProfile);

      // Simulate multiple recording attempts
      for (let i = 0; i < 5; i++) {
        await act(async () => {
          const recordButton = screen.getByRole('button', { name: /start recording/i });
          fireEvent.click(recordButton);
        });

        expect(mockIncrementUsage).not.toHaveBeenCalled();
        expect(screen.queryByText(/upgrade required/i)).not.toBeInTheDocument();
      }
    });
  });
});