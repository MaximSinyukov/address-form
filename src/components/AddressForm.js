import { Container } from '@material-ui/core';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import React from 'react';
import AddressEditor from './AddressEditor';
import AddressContainer from './AddressContainer';
import { useLoadScript } from '@react-google-maps/api';
import { CurrentAddressContext } from '../context/CurrentAddressContext';

const library = ['places'];

const FormContainer = styled(Container)`
  min-height: 320px;
  height: auto;
  margin: auto;
  padding: 20px;
  background-color: ${props =>  props.theme === 'light' ? 'Lavender' : 'black'};
`;

const FormContent = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SuccessContainer = styled.div`
  display: ${props =>  props.success ? 'flex' : 'none'};
  font-size: 72px;
  margin: 10px auto 0;
`;

function AddressForm({ theme }) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [addressEditor, setAddressEditor] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState('');
  const [editValue, setEditValue] = React.useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: library
  });

  function handleChangeValue(e) {
    setAddressValue(e.target.value);
  }

  function handleSelectOption(address) {
    setAddressValue(address);
    handleSubmit();
  }

  function handleEditorValue(e) {
    setEditValue(e.target.value + editValue);
  }

  function handleSubmit() {
    setIsSuccess(!isSuccess);
  }

  function handleEditSubmit() {
    setAddressEditor(false);
    setAddressValue(editValue);
  }

  function handleEditAddress() {
    setAddressEditor(!addressEditor);
  }

  if (loadError) return 'Error loading google maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <CurrentAddressContext.Provider value={addressValue}>
      <FormContainer theme={theme} maxWidth="sm">
        <Formik
          initialValues={{
            address: addressValue,
            country: '',
            city: '',
            street: '',
            'type street': '',
            'type room': '',
            'room number': '',
            'postal code': '',
          }}
          onSubmit={() => {handleSubmit()}}
        >
          <>
          <Form onChange={handleEditorValue}>
            <AddressEditor isOpen={addressEditor} onEditValue={handleEditSubmit} />
          </Form>
          <FormContent onChange={handleChangeValue} value={addressValue}>
            <AddressContainer success={isSuccess} onEditorClick={handleEditAddress} onSelectClick={handleSelectOption} />
            <SuccessContainer success={isSuccess}>
              <span>SUCCESS</span>
            </SuccessContainer>
          </FormContent>
          </>
        </Formik>
      </FormContainer>
    </CurrentAddressContext.Provider>
  )
}

export default AddressForm;
