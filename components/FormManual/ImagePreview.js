import styled from "styled-components";
import Image from "next/image";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";

export default function ImagePreview({
  handleImageClose,
  imageUploaded,
  image,
  currentFlashcard,
}) {
  return (
    <StyledImageWrapper onClick={handleImageClose}>
      <StyledIconWrapper>
        <MarkAsIncorrect />
      </StyledIconWrapper>
      <StyledImagePreview
        src={
          imageUploaded ? URL.createObjectURL(image) : currentFlashcard.imageUrl
        }
        alt="Preview of the image"
        sizes="300px"
        fill
      />
    </StyledImageWrapper>
  );
}

const StyledImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  position: relative;
  flex-direction: row-reverse;
  padding: 5px;
  overflow: auto;
  margin-top: 20px;
  border: 1px solid var(--primary-neutral);
  border-radius: 2px;
`;

const StyledImagePreview = styled(Image)`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const StyledIconWrapper = styled.div`
  color: #fff;
  background-color: var(--primary-neutral);
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
