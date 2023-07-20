import { ReactNode } from 'react';

interface ViewTabsChildren {
  name: string;
  element: ReactNode;
}

interface ViewTabsProps {
  tabs: string[];
  currentTab: string;
  changeTab: (value: string) => void;
  children: ViewTabsChildren[];
}

export default function ViewTabs({
  tabs,
  currentTab,
  changeTab,
  children,
}: ViewTabsProps) {
  return (
    <>
      <div className="view-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => changeTab(tab)}
            className={currentTab == tab ? 'tabs active-tabs' : 'tabs'}
          >
            {tab}
          </button>
        ))}
      </div>

      {children.map((child) => (
        <div
          className={
            child.name == currentTab ? 'tab-content active' : 'tab-content'
          }
          key={child.name}
        >
          {child.element}
        </div>
      ))}
    </>
  );
}
