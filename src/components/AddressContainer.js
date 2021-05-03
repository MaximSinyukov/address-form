import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';

const TypeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  ${props =>  props.success ? 'border-bottom: 1px solid grey;' : ''}
`;

const ValueText = styled.span`
  font-size: 22px;
  line-height: 28px;
  font-weight: normal;
`;

const EditorIcon = styled(EditIcon)`
display: flex;
  margin: auto 0 auto 10px;

  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;

function AddressContainer({ success, addressValue, onEditorClick }) {
  return (
    <TypeContainer success={success}>
      {
        success
          ? (<>
            <ValueText>{addressValue}</ValueText>
            <EditorIcon onClick={onEditorClick} color="primary" fontSize="small" ></EditorIcon>
          </>)
          : (<Field id="autocomplete" name="address" component={TextField} label="Address" color="primary" variant="outlined" />)
      }
    </TypeContainer>
  )
}


export default AddressContainer;
