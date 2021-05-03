import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';

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

  return (
    <EditorContainer isOpen={isOpen}>
      <EditorField id="country" name="country" component={TextField} label="country" color="primary" variant="filled" disabled={false} />
      <EditorField id="city" name="city" component={TextField} label="city" color="primary" variant="filled" disabled={false} />
      <EditorField id="street" name="street" component={TextField} label="street" color="primary" variant="filled" disabled={false}/>
      <EditorField id="type street" name="type street" component={TextField} label="type street" color="primary" variant="filled" disabled={false}/>
      <EditorField id="type room" name="type room" component={TextField} label="type room" color="primary" variant="filled" disabled={false}/>
      <EditorField id="room number" name="room number" component={TextField} label="room number" color="primary" variant="filled" disabled={false}/>
      <EditorField id="postal code" name="postal code" component={TextField} label="postal code" color="primary" variant="filled" disabled={false}/>
      <SubmitIcon onClick={onEditValue} color="primary" fontSize="large" />
    </EditorContainer>
  )
}

export default AddressEditor;
