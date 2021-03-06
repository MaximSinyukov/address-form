import styled from 'styled-components';
import AddressForm from './AddressForm';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <AddressForm />
    </AppContainer>
  );
}

export default App;
