import { Container } from '@material-ui/core';
import { Form, Field, Formik } from 'formik';
import styled from 'styled-components';
import React from 'react';

import AddressContainer from './AddressContainer';

const FormContainer = styled(Container)`
  height: 420px;
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
  margin: auto;
`;

function AddressForm({ theme }) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [addressEditor, setAddressEditor] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState('');

  function handleChangeValue(e) {
    setAddressValue(e.target.value);
  }

  function handleSubmit() {
    setIsSuccess(!isSuccess);
  }

  function handleEditAddress() {
    setAddressEditor(!addressEditor);
  }

  return (
    <FormContainer theme={theme} maxWidth="sm">
      <Formik
        initialValues={{ address: '' }}
        onSubmit={() => {handleSubmit()}}
      >
        <FormContent onChange={handleChangeValue} value={addressValue}>
          <AddressContainer success={isSuccess} addressValue={addressValue} onClick={handleEditAddress} />
          <SuccessContainer success={isSuccess}>
            <span>SUCCESS</span>
          </SuccessContainer>
        </FormContent>
      </Formik>
    </FormContainer>
  )
}

export default AddressForm;
