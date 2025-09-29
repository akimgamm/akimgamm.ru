import FilterBuilder from './FilterBuilder';
import type { Group } from './FilterBuilder';

const meta = {
  title: 'Organisms/FilterBuilder',
  component: FilterBuilder,
};

export default meta;

// Используем объектный синтаксис вместо функций
export const Default = {};

export const WithInitialFilter = {
  args: {
    initialFilter: {
      type: 'group',
      id: 'root',
      condition: 'AND',
      children: [
        {
          type: 'rule',
          id: '1',
          field: 'status',
          operator: 'equals',
          value: 'active',
        },
      ],
    } as Group,
  },
};

export const ComplexFilter = {
  args: {
    initialFilter: {
      type: 'group',
      id: 'root',
      condition: 'AND',
      children: [
        {
          type: 'rule',
          id: '1',
          field: 'status',
          operator: 'equals',
          value: 'active',
        },
        {
          type: 'group',
          id: '2',
          condition: 'OR',
          children: [
            {
              type: 'rule',
              id: '3',
              field: 'amount',
              operator: 'greater',
              value: '1000',
            },
            {
              type: 'rule',
              id: '4',
              field: 'client',
              operator: 'contains',
              value: 'premium',
            },
          ],
        },
      ],
    } as Group,
  },
};
