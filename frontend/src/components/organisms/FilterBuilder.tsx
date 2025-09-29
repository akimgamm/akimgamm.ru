import { useState } from 'react';
import { Button, Select, Input, Space, Typography, Divider } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

export type Condition = 'AND' | 'OR';

export type Rule = {
  type: 'rule';
  id: string;
  field: string;
  operator: string;
  value: string;
};

export type Group = {
  type: 'group';
  id: string;
  condition: Condition;
  children: (Rule | Group)[];
};

export type FilterNode = Rule | Group;

export interface FilterBuilderProps {
  /** Callback function when filter changes */
  onFilterChange?: (filter: Group) => void;
  /** Initial filter state */
  initialFilter?: Group;
  /** Available fields for filtering */
  fields?: Array<{ value: string; label: string }>;
  /** Available operators */
  operators?: Array<{ value: string; label: string }>;
  /** Custom styles */
  style?: React.CSSProperties;
}

const defaultFields = [
  { value: 'status', label: 'Статус' },
  { value: 'amount', label: 'Сумма' },
  { value: 'client', label: 'Клиент' },
  { value: 'date', label: 'Дата' },
  { value: 'manager', label: 'Менеджер' },
];

const defaultOperators = [
  { value: 'equals', label: 'равно' },
  { value: 'notEquals', label: 'не равно' },
  { value: 'contains', label: 'содержит' },
  { value: 'greater', label: 'больше' },
  { value: 'less', label: 'меньше' },
  { value: 'empty', label: 'пусто' },
  { value: 'notEmpty', label: 'не пусто' },
];

export const FilterBuilder: React.FC<FilterBuilderProps> = ({
  onFilterChange,
  initialFilter,
  fields = defaultFields,
  operators = defaultOperators,
  style,
}) => {
  const [filter, setFilter] = useState<Group>(
    initialFilter || {
      type: 'group',
      id: 'root',
      condition: 'AND',
      children: [],
    },
  );

  const generateId = () =>
    `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const updateFilter = (newFilter: Group) => {
    setFilter(newFilter);
    onFilterChange?.(newFilter);
  };

  const addRule = (parent: Group) => {
    const newFilter = JSON.parse(JSON.stringify(filter));
    const findAndUpdate = (node: FilterNode): boolean => {
      if (node.type === 'group' && node.id === parent.id) {
        node.children.push({
          type: 'rule',
          id: generateId(),
          field: '',
          operator: '',
          value: '',
        });
        return true;
      }
      if (node.type === 'group') {
        for (const child of node.children) {
          if (findAndUpdate(child)) return true;
        }
      }
      return false;
    };

    findAndUpdate(newFilter);
    updateFilter(newFilter);
  };

  const addGroup = (parent: Group) => {
    const newFilter = JSON.parse(JSON.stringify(filter));
    const findAndUpdate = (node: FilterNode): boolean => {
      if (node.type === 'group' && node.id === parent.id) {
        node.children.push({
          type: 'group',
          id: generateId(),
          condition: 'AND',
          children: [],
        });
        return true;
      }
      if (node.type === 'group') {
        for (const child of node.children) {
          if (findAndUpdate(child)) return true;
        }
      }
      return false;
    };

    findAndUpdate(newFilter);
    updateFilter(newFilter);
  };

  const removeNode = (nodeToRemove: FilterNode) => {
    const newFilter = JSON.parse(JSON.stringify(filter));
    const findAndRemove = (node: FilterNode): boolean => {
      if (node.type === 'group') {
        const index = node.children.findIndex(
          (child) => child.id === nodeToRemove.id,
        );
        if (index > -1) {
          node.children.splice(index, 1);
          return true;
        }
        for (const child of node.children) {
          if (findAndRemove(child)) return true;
        }
      }
      return false;
    };

    findAndRemove(newFilter);
    updateFilter(newFilter);
  };

  const updateNode = (updatedNode: FilterNode) => {
    const newFilter = JSON.parse(JSON.stringify(filter));
    const findAndUpdate = (node: FilterNode): boolean => {
      if (node.id === updatedNode.id) {
        Object.assign(node, updatedNode);
        return true;
      }
      if (node.type === 'group') {
        for (const child of node.children) {
          if (findAndUpdate(child)) return true;
        }
      }
      return false;
    };

    findAndUpdate(newFilter);
    updateFilter(newFilter);
  };

  const renderNode = (node: FilterNode, level: number = 0) => {
    if (node.type === 'rule') {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 0',
            borderLeft: level > 0 ? '2px solid #d9d9d9' : 'none',
            paddingLeft: level > 0 ? 12 : 0,
          }}
        >
          <Select
            placeholder='Поле'
            style={{ width: 150 }}
            value={node.field}
            onChange={(val) => updateNode({ ...node, field: val })}
            options={fields}
          />
          <Select
            placeholder='Оператор'
            style={{ width: 120 }}
            value={node.operator}
            onChange={(val) => updateNode({ ...node, operator: val })}
            options={operators}
          />
          <Input
            placeholder='Значение'
            style={{ width: 150 }}
            value={node.value}
            onChange={(e) => updateNode({ ...node, value: e.target.value })}
          />
          <Button
            type='text'
            size='small'
            danger
            icon={<CloseOutlined />}
            onClick={() => removeNode(node)}
            style={{ padding: '4px 8px' }}
          />
        </div>
      );
    }

    if (node.type === 'group') {
      const hasChildren = node.children.length > 0;

      return (
        <div
          style={{
            borderLeft: level > 0 ? '2px solid #1890ff' : 'none',
            paddingLeft: level > 0 ? 16 : 0,
            marginLeft: level > 0 ? 8 : 0,
          }}
        >
          {/* Заголовок группы */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              padding: '8px 12px',
              background: level === 0 ? '#f8f9fa' : 'transparent',
              borderRadius: 6,
            }}
          >
            <Text type='secondary' style={{ fontSize: 14 }}>
              Где
            </Text>
            <Select
              value={node.condition}
              onChange={(val) => updateNode({ ...node, condition: val })}
              options={[
                { value: 'AND', label: 'все' },
                { value: 'OR', label: 'любое' },
              ]}
              style={{ width: 100 }}
              size='small'
            />
            <Text type='secondary' style={{ fontSize: 14 }}>
              из следующих условий выполнено
            </Text>

            {level > 0 && (
              <Button
                type='text'
                size='small'
                danger
                icon={<CloseOutlined />}
                onClick={() => removeNode(node)}
                style={{ marginLeft: 'auto' }}
              />
            )}
          </div>

          {/* Дети группы */}
          {hasChildren && (
            <div
              style={{
                paddingLeft: 16,
                borderLeft: level > 0 ? '2px solid #e6f7ff' : 'none',
              }}
            >
              {node.children.map((child, index) => (
                <div key={child.id}>
                  {renderNode(child, level + 1)}
                  {index < node.children.length - 1 && (
                    <Divider
                      style={{
                        margin: '8px 0',
                        fontSize: 12,
                        color: '#d9d9d9',
                      }}
                    >
                      {node.condition === 'AND' ? 'и' : 'или'}
                    </Divider>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Кнопки добавления - всегда внизу группы */}
          <div
            style={{
              paddingLeft: 16,
              marginTop: hasChildren ? 12 : 0,
            }}
          >
            <Space>
              <Button
                size='small'
                type='primary'
                ghost
                icon={<PlusOutlined />}
                onClick={() => addRule(node)}
              >
                Добавить условие
              </Button>
              <Button
                size='small'
                type='primary'
                ghost
                icon={<PlusOutlined />}
                onClick={() => addGroup(node)}
              >
                Добавить группу
              </Button>
            </Space>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: 900,
        padding: 16,
        background: '#fff',
        borderRadius: 8,
        ...style,
      }}
    >
      {renderNode(filter)}
    </div>
  );
};

export default FilterBuilder;
