import { Container } from '@material-ui/core';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import React from 'react';
import AddressEditor from './AddressEditor';
import AddressContainer from './AddressContainer';
import { useLoadScript } from '@react-google-maps/api';
import { CurrentAddressContext } from '../context/CurrentAddressContext';
import LoopIcon from '@material-ui/icons/Loop';

const library = ['places'];

const FormContainer = styled(Container)`
  min-height: 320px;
  height: auto;
  margin: auto;
  padding: 20px;
  background-color: Lavender;
`;

const FormContent = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SuccessContainer = styled.div`
  display: ${props =>  props.success ? 'flex' : 'none'};
  flex-direction: column;
  font-size: 72px;
  margin: 10px auto 0;
`;

const ReloadIcon = styled(LoopIcon)`
  margin: 30px auto auto;

  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;

function AddressForm() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [addressEditor, setAddressEditor] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState('');
  const [addressParts, setAddressParts] = React.useState({ place_id: '', parts: {} });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: library
  });

  function handleChangeValue(e) {
    setAddressValue(e.target.value);
  }

  function handleSelectOption(place_id, newAddress) {
    const addressObj = destructureAddress(newAddress.parts);
    setAddressValue(newAddress.address);
    setAddressParts({ ...addressParts, place_id: place_id, parts: addressObj });
    handleSubmit();
  }

  function destructureAddress(address) {
    const addressObj = {};

    address.forEach((item) => {
      addressObj[item.types[0]] = item.types[0] === 'country' ? item.long_name : item.short_name;
    });

    return addressObj;
  }

  function handleEditorValue(evt) {
    const changedAddress = { ...addressParts.parts };
    changedAddress[evt.target.id] = evt.target.value;
    setAddressParts({ ...addressParts, parts: changedAddress });
  }

  function handleSubmit() {
    setIsSuccess(true);
  }

  function reloadForm() {
    setIsSuccess(false);
  }

  function handleEditSubmit() {
    const { administrative_area_level_1,  country, locality, postal_code, route, street_number } = addressParts.parts;
    let newAddress = `${route ? `${route}` : ''}${street_number ? `, ${street_number}` : ''}${locality ? `, ${locality}` : ''}${administrative_area_level_1 ? `, ${administrative_area_level_1}` : ''}${country ? `, ${country}` : ''}${postal_code ? `, ${postal_code}` : ''}`;
    newAddress = newAddress.startsWith(',') ? newAddress.slice(2) : newAddress;

    setAddressEditor(false);
    setAddressValue(newAddress);
  }

  function handleEditAddress() {
    setAddressEditor(!addressEditor);
  }

  function handleReloadForm() {
    reloadForm();
    setAddressValue('');
  }

  if (loadError) return 'Error loading google maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <CurrentAddressContext.Provider value={{addressValue: addressValue, addressParts: addressParts}}>
      <FormContainer maxWidth="sm">
        <Formik
          initialValues={{
            address: '',
            administrative_area_level_1: '',
            administrative_area_level_2: '',
            country: '',
            locality: '',
            postal_code: '',
            route: '',
            street_number: '',
          }}
          onSubmit={() => {handleSubmit()}}
        >
          <>
          <Form onChange={handleEditorValue}>
            <AddressEditor isOpen={addressEditor} onEditValue={handleEditSubmit} />
          </Form>
          <FormContent>
            <AddressContainer success={isSuccess} onEditorClick={handleEditAddress} onSelectClick={handleSelectOption} onChangeValue={handleChangeValue} />
            <SuccessContainer success={isSuccess}>
              <span>SUCCESS</span>
              <ReloadIcon onClick={handleReloadForm} color="primary" fontSize="large" />
            </SuccessContainer>
          </FormContent>
          </>
        </Formik>
      </FormContainer>
    </CurrentAddressContext.Provider>
  )
}

export default AddressForm;
