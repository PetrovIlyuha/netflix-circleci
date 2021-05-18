import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Tab.scss';

const Tab = ({ activeTab, label, onClick }) => {
  console.log(activeTab, label);
  const onTabClick = () => {
    console.log(label);
    onClick(label);
  };
  return (
    <li
      className={classnames({
        'tab-list-item': true,
        'tab-list-active': activeTab === label
      })}
      onClick={onTabClick}
    >{label}</li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tab;
