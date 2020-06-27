import React from 'react';

import spinnerClasses from './Spinner.module.css';

const spinner = () => (
    <div className = {spinnerClasses.Loader}>Loading...</div>
);

export default spinner;