import { useVyuh } from '@vyuh/react-core';
import { useEffect, useMemo, useState } from 'react';

export function useContentQuery<T>({
  query,
  params,
  type,
}: {
  query: string;
  params: Record<string, string>;
  type: 'single' | 'multiple';
}) {
  const { plugins } = useVyuh();
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    const promise =
      type === 'single'
        ? plugins.content.provider.fetchSingle(query, { params })
        : plugins.content.provider.fetchMultiple(query, { params });

    promise.then((result) => {
      setValue(result as T);
    });
  }, [query, params]);

  return value;
}
