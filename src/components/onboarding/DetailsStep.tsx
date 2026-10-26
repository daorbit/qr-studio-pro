import React from 'react';
import { Avatar, Input } from 'antd';

export interface DetailsValue {
  name: string;
  mobile: string;
  country: string;
}

interface DetailsStepProps {
  value: DetailsValue;
  email?: string;
  picture?: string;
  onChange: (value: DetailsValue) => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ value, email, picture, onChange }) => {
  const set = (field: keyof DetailsValue) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, [field]: e.target.value });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5">
        <Avatar size={44} src={picture} className="bg-primary/10 text-primary font-semibold">
          {(value.name || email || 'U').charAt(0).toUpperCase()}
        </Avatar>
        <div className="min-w-0">
          <div className="text-[15px] font-medium text-foreground truncate">{value.name || 'Your name'}</div>
          <div className="text-xs text-muted-foreground truncate">{email}</div>
        </div>
      </div>

      <div>
        <label htmlFor="onb-name" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
          Full name
        </label>
        <Input id="onb-name" autoFocus autoComplete="name" value={value.name} onChange={set('name')} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="onb-mobile" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Mobile <span className="font-normal">(optional)</span>
          </label>
          <Input id="onb-mobile" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={value.mobile} onChange={set('mobile')} />
        </div>
        <div>
          <label htmlFor="onb-country" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Country <span className="font-normal">(optional)</span>
          </label>
          <Input id="onb-country" autoComplete="country-name" placeholder="India" value={value.country} onChange={set('country')} />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
