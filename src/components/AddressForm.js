import { Container } from '@material-ui/core';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import React from 'react';

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

const TypeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  ${props =>  props.success ? 'border-bottom: 1px solid grey;' : ''}
`;

const EditorIcon = styled(EditIcon)`
display: flex;
  margin: auto 0 auto 10px;

  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;

const ValueText = styled.span`
  font-size: 22px;
  line-height: 28px;
  font-weight: normal;
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
          <TypeContainer success={isSuccess}>
            {
              isSuccess
                ? (<>
                  <ValueText>{addressValue}</ValueText>
                  <EditorIcon onClick={handleEditAddress} color="primary" fontSize="small" ></EditorIcon>
                </>)
                : (<Field id="autocomplete" name="address" component={TextField} label="Address" color="primary" variant="outlined" />)
            }
          </TypeContainer>
          <SuccessContainer success={isSuccess}>
            <span>SUCCESS</span>
          </SuccessContainer>
        </FormContent>
      </Formik>
    </FormContainer>
  )
}

export default AddressForm;
