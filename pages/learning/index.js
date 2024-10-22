import CollectionList from "@/components/CollectionList/CollectionList";

export default function LearningPage({
  collections,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeActionMode,
  changeFlashcardSelection,
  handleDeleteCollection,
  getAllFlashcardsFromCollection,
  changeCurrentCollection,
  handleEditCollection,
  currentCollection,
}) {
  return (
    <>
      <CollectionList
        modeSelection="learning"
        collections={collections}
        getCorrectFlashcardsFromCollection={getCorrectFlashcardsFromCollection}
        getIncorrectFlashcardsFromCollection={
          getIncorrectFlashcardsFromCollection
        }
        flashcardSelection={flashcardSelection}
        changeFlashcardSelection={changeFlashcardSelection}
        handleDeleteCollection={handleDeleteCollection}
        getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
        changeActionMode={changeActionMode}
        changeCurrentCollection={changeCurrentCollection}
        handleEditCollection={handleEditCollection}
        currentCollection={currentCollection}
      />
    </>
  );
}
