import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete';
import React from 'react';
import { CurrentAddressContext } from '../context/CurrentAddressContext';

const TypeContainer = styled.div`
  display: flex;
  flex-direction: ${props =>  props.success ? 'row;' : 'column;'};
  justify-content: center;
  ${props =>  props.success ? 'border-bottom: 1px solid grey;' : ''}
`;

const OptionsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  list-style: none;
  background-color: white;
  padding: 0;
  border-radius: 0 0 10px 10px;
`;

const Option = styled.li`
  color: black;
  font-size: 16px;
  line-height: 18px;

  &:hover {
    cursor: pointer;
    background-color: grey;
  }
`;

const ValueText = styled.span`
  font-size: 22px;
  line-height: 28px;
  font-weight: normal;
  max-width: 90%;
`;

const EditorIcon = styled(EditIcon)`
display: flex;
  margin: auto 0 auto 10px;

  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;

function AddressContainer({ success, onEditorClick, onSelectClick, onChangeValue }) {
  const address = React.useContext(CurrentAddressContext);

  const { ready,  suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete();

  async function selectOption(place_id) {
    const newAddress = {};

    await getDetails({ placeId: place_id })
            .then((details) => {
              newAddress.parts = details.address_components;
              newAddress.address = details.formatted_address;
            })
            .catch((error) => {
              console.log("Error: ", error);
            });

    onSelectClick(place_id, newAddress);
    clearSuggestions();
  }

  return (
    <TypeContainer success={success}>
      {
        success
          ? (<>
            <ValueText>{address.addressValue}</ValueText>
            <EditorIcon onClick={onEditorClick} color="primary" fontSize="small" ></EditorIcon>
          </>)
          : (<>
              <Field
                id="autocomplete"
                name="address"
                component={TextField}
                label="Address"
                color="primary"
                variant="outlined"
                value={address.addressValue}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChangeValue(e);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    selectOption(data[0].place_id);
                  }
                }}
                disabled={!ready}
              />
              <OptionsContainer>
                {status === 'OK' && data.map(({place_id, description}) => (
                  <Option
                    key={place_id}
                    onClick={() => {
                      selectOption(place_id);
                    }}
                  >
                    {description}
                  </Option>
                ))}
              </OptionsContainer>
            </>
            )
      }
    </TypeContainer>
  )
}


export default AddressContainer;
