import React, { useState } from 'react';
import CollegeSelector from './components/CollegeSelector';
import Dashboard from './components/Dashboard';

const App = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);

  return (
    <div>
      <CollegeSelector onSelectCollege={setSelectedCollege} />
      <Dashboard selectedCollege={selectedCollege} />
    </div>
  );
};

export default App;

