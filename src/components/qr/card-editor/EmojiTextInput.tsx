import React from 'react';
import { ActionIcon, Popover, TextInput } from '@mantine/core';
import { Smile } from 'lucide-react';
import { EMOJI_GROUPS } from './cardEditorOptions';

interface EmojiTextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const EmojiTextInput: React.FC<EmojiTextInputProps> = ({ label, value, placeholder, onChange }) => (
  <TextInput
    size="sm"
    label={label}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.currentTarget.value)}
    rightSectionPointerEvents="all"
    rightSection={
      <Popover position="bottom-end" width={264} shadow="lg">
        <Popover.Target>
          <ActionIcon size="sm" aria-label="Insert emoji">
            <Smile size={14} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <div className="max-h-56 space-y-2 overflow-y-auto">
            {EMOJI_GROUPS.map((group) => (
              <div key={group.name}>
                <div className="mb-1 text-[11px] font-medium text-muted-foreground">{group.name}</div>
                <div className="flex flex-wrap gap-0.5">
                  {group.emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => onChange(value + emoji)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors hover:bg-foreground/[0.06]"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Popover.Dropdown>
      </Popover>
    }
  />
);

export default EmojiTextInput;
