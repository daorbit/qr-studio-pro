export const CREATE_STEPS = [
  { key: 'type', label: 'Type', title: 'What should it open?', lede: 'Pick what happens when someone scans your code.' },
  { key: 'content', label: 'Content', title: 'Add the details', lede: 'Give it a name you will recognise, then fill in what it links to.' },
  { key: 'style', label: 'Style', title: 'Pick a style', lede: 'Start from a ready-made look. You can fine-tune every detail next.' },
  { key: 'customize', label: 'Customize', title: 'Make it yours', lede: 'Colors, dot shapes, your logo and a frame.' },
  { key: 'card', label: 'Card', title: 'Add a card', lede: 'Optional. Wrap the code in a printable card with your own text.' },
  { key: 'settings', label: 'Settings', title: 'Protection and limits', lede: 'Optional. Add a password, an expiry date or a scan limit.' },
] as const;

export type CreateStepKey = (typeof CREATE_STEPS)[number]['key'];

export const CONTENT_STEP = 1;
