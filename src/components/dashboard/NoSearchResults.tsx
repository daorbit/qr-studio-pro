import React from 'react';
import { Button } from '@mantine/core';
import { SearchX } from 'lucide-react';
import EmptyBlock from '@/components/common/EmptyBlock';

interface NoSearchResultsProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchTerm, onClearSearch }) => (
  <div className="rounded-[22px] border border-border bg-card">
    <EmptyBlock
      icon={SearchX}
      title="No matching QR codes"
      description={`Nothing matches “${searchTerm}”. Try another name or clear the search.`}
      action={
        <Button variant="default" onClick={onClearSearch}>
          Clear search
        </Button>
      }
    />
  </div>
);

export default NoSearchResults;
