export type { NavigationPath };

interface NavigationPath {
  from: string;
  to: string;
  type: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NavigationLabels: any = {
  '/home': 'Home',
  '/my-communities': 'My Communities',
  '/community/[uid]': 'My Communities',
  '/my-claims': 'My Claims',
  '/claim/[uid]': 'My Claims',
}
