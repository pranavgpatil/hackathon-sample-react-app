import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'My React App';
  }, []);

  return (
    <div>
      <h1>Welcome to Solid2</h1>
      <p>This is a sample React application with tests.</p>
    </div>
  );
}

export default App;