import React from 'react';
import { CloseButton, SegmentedControl, TextInput } from '@mantine/core';
import { LayoutGrid, List, Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

const VIEWS = [
  { value: 'grid', label: <LayoutGrid size={15} aria-label="Grid view" /> },
  { value: 'list', label: <List size={15} aria-label="List view" /> },
];

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, viewMode, onViewModeChange }) => (
  <div className="flex w-full items-center gap-2 sm:w-auto">
    <TextInput
      radius="xl"
      placeholder="Search codes"
      leftSection={<Search size={15} />}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.currentTarget.value)}
      rightSection={searchTerm ? <CloseButton size="sm" onClick={() => onSearchChange('')} aria-label="Clear search" /> : null}
      className="flex-1 sm:w-64 sm:flex-none"
      aria-label="Search codes"
    />
    <SegmentedControl data={VIEWS} value={viewMode} onChange={(v) => onViewModeChange(v as 'list' | 'grid')} />
  </div>
);

export default SearchBar;
