import React from 'react';
import { ActionIcon, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { RefreshCw, Search } from 'lucide-react';

interface SearchHeaderProps {
  title: string;
  description: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onRefresh: () => void;
  loading: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  title,
  description,
  searchValue,
  onSearchChange,
  onSearch,
  onRefresh,
  loading,
}) => (
  <div className="mb-4 space-y-3">
    <div>
      <Title order={4}>{title}</Title>
      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </div>
    <div className="flex items-center gap-2">
      <TextInput
        placeholder="Search by user name or email"
        value={searchValue}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
        leftSection={<Search size={14} />}
        className="flex-1"
        aria-label="Search subscriptions"
      />
      <Tooltip label="Refresh">
        <ActionIcon variant="default" size="lg" onClick={onRefresh} loading={loading} aria-label="Refresh">
          <RefreshCw size={14} />
        </ActionIcon>
      </Tooltip>
    </div>
  </div>
);

export default SearchHeader;
