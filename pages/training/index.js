import CollectionList from "@/components/CollectionList/CollectionList";
import { useSession } from "next-auth/react";
import { StyledAccessDeniedMessage } from "@/styledComponents";

export default function TrainingPage({
  collections,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
  handleDeleteCollection,
  getAllFlashcardsFromCollection,
}) {
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <StyledAccessDeniedMessage>
        Please log in to access this page.
      </StyledAccessDeniedMessage>
    );
  }

  return (
    <>
      <CollectionList
        modeSelection="training"
        collections={collections}
        getCorrectFlashcardsFromCollection={getCorrectFlashcardsFromCollection}
        getIncorrectFlashcardsFromCollection={
          getIncorrectFlashcardsFromCollection
        }
        flashcardSelection={flashcardSelection}
        changeFlashcardSelection={changeFlashcardSelection}
        handleDeleteCollection={handleDeleteCollection}
        getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
      />
    </>
  );
}
