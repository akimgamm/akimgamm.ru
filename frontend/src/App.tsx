import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import {
  Layout,
  Menu,
  Input,
  Avatar,
  Space,
  Dropdown,
  Typography,
  Divider,
  Button,
  Modal,
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  BellOutlined,
  SearchOutlined,
  LogoutOutlined,
  SettingOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { FilterBuilder, Group } from './components/organisms/FilterBuilder'; // Импортируйте ваш компонент фильтра

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

// Страницы (добавим фильтры к некоторым страницам)
const Dashboard = () => <h1>Главная</h1>;
const Team = () => <h1>Сотрудники</h1>;
const Profile = () => <h1>Профиль и настройки</h1>;

// Компоненты с фильтрами
const Customers = () => {
  const [filters, setFilters] = useState<Group | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleFilterChange = (newFilters: Group) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    setIsFilterModalVisible(false);
    // Здесь логика применения фильтров к данным клиентов
  };

  const handleClearFilters = () => {
    setFilters(null);
    // Логика сброса данных к исходному состоянию
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1>Клиенты</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {filters && (
            <Button onClick={handleClearFilters}>Очистить фильтры</Button>
          )}
          <Button
            type={filters ? 'primary' : 'default'}
            icon={<FilterOutlined />}
            onClick={() => setIsFilterModalVisible(true)}
          >
            Фильтры {filters && `(${filters.children?.length || 0})`}
          </Button>
        </div>
      </div>

      <Modal
        title='Фильтры клиентов'
        open={isFilterModalVisible}
        onOk={handleApplyFilters}
        onCancel={() => setIsFilterModalVisible(false)}
        width={800}
        okText='Применить'
        cancelText='Отмена'
      >
        <FilterBuilder onFilterChange={handleFilterChange} />
      </Modal>

      {/* Здесь будет ваш список клиентов */}
    </div>
  );
};

const Deals = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Group | null>(null);

  const handleFilterChange = (filter: Group) => {
    setActiveFilters(filter);
  };

  const applyFilters = () => {
    console.log('Применяем фильтры:', activeFilters);
    setIsFilterModalVisible(false);
    // Здесь логика применения фильтров к данным
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1>Сделки</h1>
        <Button
          type={activeFilters ? 'primary' : 'default'}
          icon={<FilterOutlined />}
          onClick={() => setIsFilterModalVisible(true)}
        >
          Фильтры {activeFilters && `(${activeFilters.children?.length || 0})`}
        </Button>
      </div>

      <Modal
        title='Фильтры сделок'
        open={isFilterModalVisible}
        onOk={applyFilters}
        onCancel={() => setIsFilterModalVisible(false)}
        width={800}
        okText='Применить'
        cancelText='Отмена'
      >
        <FilterBuilder onFilterChange={handleFilterChange} />
      </Modal>

      {/* Здесь будет ваш список сделок */}
      <div style={{ marginTop: 16 }}>
        <Text strong>Активные фильтры:</Text>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6 }}>
          {JSON.stringify(activeFilters, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Остальные компоненты...
const Tasks = () => <h1>Задачи</h1>;
const Documents = () => <h1>Документы</h1>;
const Analytics = () => <h1>Аналитика</h1>;

// Остальной код остается таким же...
const topMenuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Главная' },
  { key: '/customers', icon: <UserOutlined />, label: 'Клиенты' },
  { key: '/deals', icon: <FileTextOutlined />, label: 'Сделки' },
  { key: '/tasks', icon: <CheckCircleOutlined />, label: 'Задачи' },
  { key: '/documents', icon: <FolderOpenOutlined />, label: 'Документы' },
  { key: '/analytics', icon: <BarChartOutlined />, label: 'Аналитика' },
  { key: '/team', icon: <TeamOutlined />, label: 'Сотрудники' },
];
// ⚡ данные пользователя (можно получать из контекста/Redux)
const userName = 'Александр Иванов';
const userEmail = 'user@example.com';
// const telegramUser = "@myTelegram";

// Меню для аватара
const userMenu = (
  <Menu style={{ width: 220 }}>
    {/* Шапка меню */}
    <div style={{ padding: '12px 16px' }}>
      <Text strong>{userName}</Text>
      <br />
      <Text type='secondary' style={{ fontSize: 12 }}>
        {userEmail}
        {/* или telegramUser */}
      </Text>
    </div>
    <Divider style={{ margin: '4px 0' }} />

    {/* Пункты меню */}
    <Menu.Item key='profile' icon={<SettingOutlined />}>
      <Link to='/profile'>Профиль и настройки</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='logout' icon={<LogoutOutlined />}>
      Выйти
    </Menu.Item>
  </Menu>
);

const SideMenu: React.FC = () => {
  const location = useLocation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Верхнее меню */}
      <Menu
        mode='inline'
        selectedKeys={[location.pathname]}
        theme='light'
        inlineCollapsed
        style={{ borderRight: 0, flex: 1 }}
      >
        {topMenuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>

      {/* Аватар внизу */}
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <Dropdown overlay={userMenu} placement='topRight' trigger={['click']}>
          <Avatar
            style={{
              backgroundColor: '#1890ff',
              cursor: 'pointer',
            }}
          >
            A
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Сайдбар */}
        <Sider width={80} style={{ background: '#fff' }}>
          <SideMenu />
        </Sider>

        <Layout>
          {/* Хедер */}
          <Header
            style={{
              background: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 16px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder='Поиск...'
              style={{ width: 300 }}
            />
            <Space size='large'>
              <BellOutlined style={{ fontSize: 18 }} />
            </Space>
          </Header>

          {/* Контент */}
          <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/deals' element={<Deals />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/documents' element={<Documents />} />
              <Route path='/analytics' element={<Analytics />} />
              <Route path='/team' element={<Team />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
