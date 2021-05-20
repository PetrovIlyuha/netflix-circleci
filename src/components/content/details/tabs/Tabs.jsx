import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './Tabs.scss';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  console.log(activeTab);
  const onTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(children);
  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map(({ props: { label } }) => {
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onTabClick}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map(
          ({ props: { label, children } }) => label === activeTab && children
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Tabs;
