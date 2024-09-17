import { useRouter } from "next/router";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";

export default function CollectionPage({
  handleToggleCorrect,
  handleDeleteFlashcard,
  actionMode,
  changeActionMode,
  changeCurrentFlashcard,
  getAllFlashcardsFromCollection,
  handleIncreaseFlashcardLevel,
  handleDecreaseFlashcardLevel,
  modeSelection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);

  const collectionTitle = allFlashcardsFromCollection?.[0]?.collectionTitle;
  const collectionColor = allFlashcardsFromCollection?.[0]?.collectionColor;

  return (
    <>
      {allFlashcardsFromCollection.length > 0 && (
        <FlashcardList
          handleDeleteFlashcard={handleDeleteFlashcard}
          headline={collectionTitle}
          subheading="Training Mode"
          flashcards={allFlashcardsFromCollection}
          handleToggleCorrect={handleToggleCorrect}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          collectionColor={collectionColor}
          handleIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
          handleDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
          modeSelection={modeSelection}
        />
      )}
      {(!allFlashcardsFromCollection ||
        allFlashcardsFromCollection.length === 0) && (
        <StyledMessage>
          No flashcards in this collection found. Add some new!
        </StyledMessage>
      )}
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;
