import styled from "styled-components";
import Upload from "@/public/icons/Upload.svg";

export default function UploadButton({ uploadImage }) {
  return (
    <>
      <StyledImageInput htmlFor="image">
        <IconTextWrapper>
          <Upload />
          Upload Image
        </IconTextWrapper>
      </StyledImageInput>
      <HiddenImageInput
        name="image"
        type="file"
        accept="image/*"
        id="image"
        onChange={(event) => uploadImage(event.target.files[0])}
      />
    </>
  );
}

const HiddenImageInput = styled.input.attrs({
  type: "file",
})`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const StyledImageInput = styled.label`
  padding: 8px 14px;
  background-color: var(--secondary-grey);
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  display: inline-block;
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
