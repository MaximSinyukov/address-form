import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import { CurrentAddressContext } from '../context/CurrentAddressContext';

const EditorContainer = styled.div`
  display: ${props => props.isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(4, 120px);
  gap: 10px 10px;
  margin-bottom: 10px;
  justify-content: center;
`;

const EditorField = styled(Field)`
  width: 120px;
  font-size: 16px;
  line-height: 18px;
`;

const SubmitIcon = styled(CheckIcon)`
  margin: auto;

  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;

function AddressEditor({ isOpen, onEditValue }) {
  const address = React.useContext(CurrentAddressContext);

  return (
    <EditorContainer isOpen={isOpen}>
      <EditorField
        id="country"
        name="country"
        component={TextField}
        label="country"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.country || ''}
      />
      <EditorField
        id="administrative_area_level_1"
        name="administrative_area_level_1"
        component={TextField}
        label="subject"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.administrative_area_level_1 || ''}
      />
      <EditorField
        id="locality"
        name="locality"
        component={TextField}
        label="city"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.locality || ''}
      />
      <EditorField
        id="administrative_area_level_2"
        name="administrative_area_level_2"
        component={TextField}
        label="address 2"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.administrative_area_level_2 || ''}
      />
      <EditorField
        id="route"
        name="route"
        component={TextField}
        label="street"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.route || ''}
      />
      <EditorField
        id="street_number"
        name="street_number"
        component={TextField}
        label="house number"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.street_number || ''}
      />
      <EditorField
        id="postal_code"
        name="postal code"
        component={TextField}
        label="postal code"
        color="primary"
        variant="filled"
        disabled={false}
        value={address.addressParts.parts.postal_code || ''}
      />
      <SubmitIcon onClick={onEditValue} color="primary" fontSize="large" />
    </EditorContainer>
  )
}

export default AddressEditor;
