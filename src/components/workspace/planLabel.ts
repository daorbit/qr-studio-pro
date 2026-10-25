import type { WorkspacePlan } from '@/types/workspace';

const NAMES: Record<WorkspacePlan['planType'], string> = {
  free: 'Free',
  basic: 'Basic',
  pro: 'Pro',
  enterprise: 'Enterprise',
  trial: 'Pro trial',
};

export const planLabel = (plan: WorkspacePlan | undefined) => `${plan ? NAMES[plan.planType] : 'Free'} plan`;
