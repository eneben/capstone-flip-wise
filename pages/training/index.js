import CollectionList from "@/components/CollectionList/CollectionList";

export default function TrainingPage({
  collections,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
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
        changeActionMode={changeActionMode}
        changeCurrentCollection={changeCurrentCollection}
        handleEditCollection={handleEditCollection}
        currentCollection={currentCollection}
      />
    </>
  );
}
