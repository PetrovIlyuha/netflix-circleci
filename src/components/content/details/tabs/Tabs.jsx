import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './Tabs.scss';
import { motion } from 'framer-motion';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  console.log(activeTab);
  const onTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(children);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 2 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, delay: 2.8 }
      }}
      className="tabs"
    >
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
    </motion.div>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Tabs;
